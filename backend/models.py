from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    password_hash: str
    email: Optional[str] = None
    avatar_url: Optional[str] = None
    reset_code: Optional[str] = None
    reset_expiry: Optional[datetime] = None

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    remote_id: Optional[str] = None
    title: str
    description: Optional[str] = None
    completed: bool = False
    status: str = "todo"
    user_id: int = Field(foreign_key="user.id")
    updated_at: datetime = datetime.utcnow()
    dirty: bool = False
