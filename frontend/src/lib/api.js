import client from './client';
import offlineDB from '../utilis/db';

// Enhanced API functions with offline support
export const taskAPI = {
  // Get all tasks with offline fallback
  async getTasks(filters = {}) {
    try {
      const response = await client.get('/tasks', { params: filters });
      
      // Save to offline DB
      await offlineDB.saveTasks(response.data);
      
      return response.data;
    } catch (error) {
      if (!navigator.onLine) {
        console.log('Offline mode: Loading tasks from local DB');
        const localTasks = await offlineDB.getAllTasks();
        
        // Apply filters locally
        let filteredTasks = localTasks;
        if (filters.status) {
          filteredTasks = filteredTasks.filter(task => task.status === filters.status);
        }
        
        return filteredTasks;
      }
      throw error;
    }
  },

  // Create task with offline support
  async createTask(taskData) {
    const taskWithMetadata = {
      ...taskData,
      id: `client_${Date.now()}`,
      dirty: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await client.post('/tasks', taskData);
      
      // Remove client version and save server version
      await offlineDB.deleteTask(taskWithMetadata.id);
      await offlineDB.saveTask(response.data);
      
      return response.data;
    } catch (error) {
      if (!navigator.onLine) {
        console.log('Offline mode: Saving task locally');
        await offlineDB.saveTask(taskWithMetadata);
        return taskWithMetadata;
      }
      throw error;
    }
  },

  // Update task with offline support
  async updateTask(taskId, updates) {
    const task = await offlineDB.getTask(taskId);
    const updatedTask = {
      ...task,
      ...updates,
      dirty: true,
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await client.patch(`/tasks/${taskId}`, updates);
      
      // Mark as clean and save server version
      response.data.dirty = false;
      await offlineDB.saveTask(response.data);
      
      return response.data;
    } catch (error) {
      if (!navigator.onLine) {
        console.log('Offline mode: Updating task locally');
        await offlineDB.saveTask(updatedTask);
        return updatedTask;
      }
      throw error;
    }
  },

  // Delete task with offline support
  async deleteTask(taskId) {
    try {
      await client.delete(`/tasks/${taskId}`);
      await offlineDB.deleteTask(taskId);
    } catch (error) {
      if (!navigator.onLine) {
        console.log('Offline mode: Marking task for deletion');
        const task = await offlineDB.getTask(taskId);
        if (task) {
          task.dirty = true;
          task._deleted = true;
          await offlineDB.saveTask(task);
        }
      } else {
        throw error;
      }
    }
  },

  // Sync tasks with server
  async syncTasks() {
    if (!navigator.onLine) {
      throw new Error('Cannot sync while offline');
    }

    const dirtyTasks = await offlineDB.getDirtyTasks();
    const syncData = {
      tasks: dirtyTasks.map(task => ({
        ...task,
        deleted: task._deleted || false
      })),
      last_sync: new Date().toISOString()
    };

    try {
      const response = await client.post('/sync', syncData);
      
      // Mark all synced tasks as clean
      for (const task of dirtyTasks) {
        await offlineDB.markTaskClean(task.id);
        if (task._deleted) {
          await offlineDB.deleteTask(task.id);
        }
      }
      
      // Save synced tasks from server
      await offlineDB.saveTasks(response.data.tasks);
      
      return response.data;
    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    }
  }
};

export const summaryAPI = {
  async getSummary() {
    try {
      const response = await client.get('/summary');
      return response.data;
    } catch (error) {
      // Provide basic summary from local data
      if (!navigator.onLine) {
        const tasks = await offlineDB.getAllTasks();
        const total_tasks = tasks.length;
        const completed_tasks = tasks.filter(t => t.completed).length;
        const completion_percentage = total_tasks > 0 ? (completed_tasks / total_tasks) * 100 : 0;
        
        return {
          total_tasks,
          completed_tasks,
          completion_percentage,
          tasks_this_week: tasks.filter(t => 
            new Date(t.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          ).length,
          completed_this_week: tasks.filter(t => 
            t.completed && new Date(t.completed_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          ).length,
          insights: ['Working in offline mode'],
          productivity_score: completion_percentage
        };
      }
      throw error;
    }
  }
};

// Network status monitoring
export const network = {
  isOnline: () => navigator.onLine,
  
  addOnlineListener: (callback) => {
    window.addEventListener('online', callback);
  },
  
  addOfflineListener: (callback) => {
    window.addEventListener('offline', callback);
  },
  
  removeOnlineListener: (callback) => {
    window.removeEventListener('online', callback);
  },
  
  removeOfflineListener: (callback) => {
    window.removeEventListener('offline', callback);
  }
};