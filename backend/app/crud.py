from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from datetime import datetime, timedelta
import uuid

from . import models, schemas, auth

# 🔐 USER OPERATIONS

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password,
        avatar=user.avatar
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: str, user_update: schemas.UserUpdate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    
    if 'password' in update_data:
        update_data['hashed_password'] = auth.get_password_hash(update_data.pop('password'))
    
    for field, value in update_data.items():
        setattr(db_user, field, value)
    
    db_user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_user)
    return db_user

def store_reset_code(db: Session, user_id: str, reset_code: str):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db_user.reset_code = reset_code
        db_user.reset_code_expiry = datetime.utcnow() + timedelta(hours=1)
        db.commit()

def reset_password(db: Session, reset_data: schemas.PasswordReset):
    db_user = db.query(models.User).filter(
        and_(
            models.User.email == reset_data.email,
            models.User.reset_code == reset_data.reset_code,
            models.User.reset_code_expiry > datetime.utcnow()
        )
    ).first()
    
    if not db_user:
        raise ValueError("Invalid reset code or code expired")
    
    db_user.hashed_password = auth.get_password_hash(reset_data.new_password)
    db_user.reset_code = None
    db_user.reset_code_expiry = None
    db_user.updated_at = datetime.utcnow()
    db.commit()
    return db_user

# 📝 TASK OPERATIONS

def create_task(db: Session, task: schemas.TaskCreate, user_id: str):
    db_task = models.Task(
        **task.dict(exclude={'client_id'}),
        user_id=user_id,
        client_id=task.client_id
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_user_tasks(db: Session, user_id: str, status: Optional[str] = None):
    query = db.query(models.Task).filter(models.Task.user_id == user_id)
    
    if status:
        query = query.filter(models.Task.status == status)
    
    return query.order_by(models.Task.updated_at.desc()).all()

def get_task(db: Session, task_id: str, user_id: str):
    return db.query(models.Task).filter(
        and_(models.Task.id == task_id, models.Task.user_id == user_id)
    ).first()

def update_task(db: Session, task_id: str, user_id: str, task_update: schemas.TaskUpdate):
    db_task = get_task(db, task_id, user_id)
    if not db_task:
        return None
    
    update_data = task_update.dict(exclude_unset=True)
    
    # Handle completion timestamp
    if 'completed' in update_data and update_data['completed'] != db_task.completed:
        if update_data['completed']:
            update_data['completed_at'] = datetime.utcnow()
        else:
            update_data['completed_at'] = None
    
    for field, value in update_data.items():
        setattr(db_task, field, value)
    
    db_task.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: str, user_id: str):
    db_task = get_task(db, task_id, user_id)
    if not db_task:
        return False
    
    db.delete(db_task)
    db.commit()
    return True

# 🔄 SYNC OPERATIONS

def sync_tasks(db: Session, user_id: str, sync_data: schemas.SyncRequest):
    conflicts = []
    server_tasks = []
    
    for client_task in sync_data.tasks:
        if client_task.deleted:
            # Handle deletion
            if client_task.id.startswith('client_'):
                # Client-side only task, no need to delete from server
                continue
            db_task = get_task(db, client_task.id, user_id)
            if db_task:
                db.delete(db_task)
            continue
        
        if client_task.id.startswith('client_'):
            # New task from client
            db_task = models.Task(
                title=client_task.title,
                description=client_task.description,
                status=client_task.status,
                completed=client_task.completed,
                user_id=user_id,
                client_id=client_task.id
            )
        else:
            # Existing task
            db_task = get_task(db, client_task.id, user_id)
            if not db_task:
                continue
            
            # Conflict resolution: client wins if dirty
            if client_task.dirty and db_task.dirty:
                # Both modified - this is a conflict
                conflicts.append({
                    "task_id": client_task.id,
                    "server_task": schemas.Task.from_orm(db_task).dict(),
                    "client_task": client_task.dict()
                })
                # For simplicity, client wins in conflicts
                pass
            
            if client_task.dirty:
                # Update with client data
                db_task.title = client_task.title
                db_task.description = client_task.description
                db_task.status = client_task.status
                db_task.completed = client_task.completed
        
        db_task.dirty = False
        db_task.last_sync = datetime.utcnow()
        
        if db_task.id is None:
            db.add(db_task)
        
        db.commit()
        db.refresh(db_task)
        server_tasks.append(db_task)
    
    # Get all current tasks for user
    all_tasks = get_user_tasks(db, user_id)
    
    return schemas.SyncResponse(
        tasks=all_tasks,
        conflicts=conflicts,
        server_time=datetime.utcnow()
    )