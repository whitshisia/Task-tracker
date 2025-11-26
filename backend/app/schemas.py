from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List, Dict, Any
from datetime import datetime
import re

# 🔐 AUTHENTICATION SCHEMAS

class UserBase(BaseModel):
    email: EmailStr
    username: str
    avatar: Optional[str] = None

class UserCreate(UserBase):
    password: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search(r"[A-Z]", v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r"[a-z]", v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r"\d", v):
            raise ValueError('Password must contain at least one digit')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    avatar: Optional[str] = None
    password: Optional[str] = None

class User(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordReset(BaseModel):
    email: EmailStr
    reset_code: str
    new_password: str

# 📝 TASK SCHEMAS

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "todo"
    completed: bool = False

class TaskCreate(TaskBase):
    client_id: Optional[str] = None  # For offline creation

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    completed: Optional[bool] = None
    dirty: Optional[bool] = None

class Task(TaskBase):
    id: str
    user_id: str
    dirty: bool
    client_id: Optional[str]
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime]
    last_sync: Optional[datetime]
    
    class Config:
        from_attributes = True

# 🔄 SYNC SCHEMAS

class SyncTask(BaseModel):
    id: str
    client_id: Optional[str] = None
    title: str
    description: Optional[str] = None
    status: str
    completed: bool
    dirty: bool
    created_at: datetime
    updated_at: datetime
    deleted: bool = False

class SyncRequest(BaseModel):
    tasks: List[SyncTask]
    last_sync: Optional[datetime] = None

class SyncResponse(BaseModel):
    tasks: List[Task]
    conflicts: List[Dict[str, Any]] = []
    server_time: datetime = datetime.utcnow()

# 🤖 INSIGHTS SCHEMAS

class Summary(BaseModel):
    total_tasks: int
    completed_tasks: int
    completion_percentage: float
    tasks_this_week: int
    completed_this_week: int
    weekly_completion_percentage: float
    insights: List[str]
    productivity_score: float