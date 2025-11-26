from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
from datetime import datetime, timedelta

from . import models, schemas, auth, crud, ai_insights, database
from .auth import get_current_user, get_password_hash

app = FastAPI(title="Task Manager API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
models.Base.metadata.create_all(bind=database.engine)

# 🔐 1️⃣ AUTHENTICATION & USER MANAGEMENT

@app.post("/signup", response_model=schemas.Token)
def signup(user_data: schemas.UserCreate, db: Session = Depends(database.get_session)):
    """Create new user with hashed password"""
    # Check if user already exists
    db_user = crud.get_user_by_email(db, user_data.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user = crud.create_user(db, user_data)
    
    # Generate tokens
    access_token = auth.create_access_token(data={"sub": user.email})
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=schemas.Token)
def login(user_data: schemas.UserLogin, db: Session = Depends(database.get_session)):
    """Authenticate user and return tokens"""
    user = auth.authenticate_user(db, user_data.email, user_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me", response_model=schemas.User)
def get_current_user_info(current_user: models.User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

@app.put("/update-profile", response_model=schemas.User)
def update_profile(
    update_data: schemas.UserUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_session)
):
    """Update user profile information"""
    return crud.update_user(db, current_user.id, update_data)

@app.post("/password-reset-request")
def password_reset_request(
    request: schemas.PasswordResetRequest,
    db: Session = Depends(database.get_session)
):
    """Request password reset (simplified version)"""
    user = crud.get_user_by_email(db, request.email)
    if user:
        # In a real app, send email with reset code
        reset_code = auth.create_reset_token()
        crud.store_reset_code(db, user.id, reset_code)
        
    # Always return success to prevent email enumeration
    return {"message": "If the email exists, a reset code has been sent"}

@app.post("/password-reset")
def password_reset(
    reset_data: schemas.PasswordReset,
    db: Session = Depends(database.get_session)
):
    """Reset password with code"""
    return crud.reset_password(db, reset_data)

# 📝 2️⃣ TASK MANAGEMENT

@app.post("/tasks", response_model=schemas.Task)
def create_task(
    task: schemas.TaskCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_session)
):
    """Create a new task"""
    return crud.create_task(db, task, current_user.id)

@app.get("/tasks", response_model=List[schemas.Task])
def read_tasks(
    status: Optional[str] = None,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_session)
):
    """Get all tasks for current user, optionally filtered by status"""
    tasks = crud.get_user_tasks(db, current_user.id, status)
    return tasks

@app.get("/tasks/{task_id}", response_model=schemas.Task)
def read_task(
    task_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_session)
):
    """Get a specific task"""
    task = crud.get_task(db, task_id, current_user.id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.patch("/tasks/{task_id}", response_model=schemas.Task)
def update_task(
    task_id: str,
    task_update: schemas.TaskUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_session)
):
    """Update a task"""
    task = crud.update_task(db, task_id, current_user.id, task_update)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.delete("/tasks/{task_id}")
def delete_task(
    task_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_session)
):
    """Delete a task"""
    success = crud.delete_task(db, task_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}

@app.post("/sync", response_model=schemas.SyncResponse)
def sync_tasks(
    sync_data: schemas.SyncRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_session)
):
    """Sync tasks between client and server"""
    return crud.sync_tasks(db, current_user.id, sync_data)

# 🤖 3️⃣ AI / INSIGHTS

@app.get("/summary", response_model=schemas.Summary)
def get_task_summary(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_session)
):
    """Get task summary and AI insights"""
    return ai_insights.generate_summary(db, current_user.id)

# Health check
@app.get("/")
def read_root():
    return {"message": "Task Manager API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)