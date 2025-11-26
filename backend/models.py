from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    password_hash: str

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    remote_id: Optional[str] = None

    title: str
    description: Optional[str] = None
    
    completed: bool = False
    status: str = "todo"    # 👈 REQUIRED FOR KANBAN
    
    user_id: int = Field(foreign_key="user.id")

    updated_at: datetime = datetime.utcnow()
    dirty: bool = False