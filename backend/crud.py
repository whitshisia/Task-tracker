from sqlmodel import Session, select
from models import User, Task
from auth import hash_password, verify_password, create_access_token
from fastapi import HTTPException
from datetime import datetime, timedelta
from typing import List, Dict, Any

def create_user(session: Session, username: str, password: str):
    existing = session.exec(select(User).where(User.username == username)).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    user = User(username=username, password_hash=hash_password(password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def login_user(session: Session, username: str, password: str):
    user = session.exec(select(User).where(User.username == username)).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

def create_task(session: Session, title: str, description: str, user_id: int):
    task = Task(title=title, description=description, user_id=user_id, updated_at=datetime.utcnow())
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def get_tasks(session: Session, user_id: int) -> List[Task]:
    return session.exec(select(Task).where(Task.user_id == user_id)).all()

def update_task(session: Session, task_id: int, data: Dict[str,Any], user_id: int):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    for k,v in data.items():
        if hasattr(task, k):
            setattr(task, k, v)
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def delete_task(session: Session, task_id: int, user_id: int):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"ok": True}

def sync_tasks(session: Session, user_id: int, client_tasks: List[Dict]) -> List[Task]:
    server_now = datetime.utcnow()
    for ct in client_tasks:
        remote_id = ct.get("remote_id")
        client_updated = None
        if ct.get("updated_at"):
            try:
                client_updated = datetime.fromisoformat(ct["updated_at"])
            except:
                client_updated = None
        task = None
        if remote_id:
            task = session.exec(select(Task).where(Task.remote_id == remote_id, Task.user_id == user_id)).first()
        if not task and ct.get("id"):
            task = session.get(Task, ct["id"])
            if task and task.user_id != user_id:
                task = None
        if task:
            if client_updated and client_updated > task.updated_at:
                task.title = ct.get("title", task.title)
                task.description = ct.get("description", task.description)
                task.completed = ct.get("completed", task.completed)
                task.updated_at = client_updated
            task.dirty = False
            session.add(task)
        else:
            new_task = Task(
                remote_id=remote_id,
                title=ct.get("title",""),
                description=ct.get("description"),
                completed=ct.get("completed", False),
                user_id=user_id,
                updated_at=client_updated or server_now,
                dirty=False
            )
            session.add(new_task)
    session.commit()
    return session.exec(select(Task).where(Task.user_id == user_id)).all()

def ai_summary(session: Session, user_id: int):
    tasks = get_tasks(session, user_id)
    total = len(tasks)
    completed = sum(1 for t in tasks if t.completed)
    pct = round((completed / total * 100), 1) if total else 0.0
    now = datetime.utcnow()
    week_ago = now - timedelta(days=7)
    this_week = [t for t in tasks if t.updated_at >= week_ago]
    completed_week = sum(1 for t in this_week if t.completed)
    summary = {
        "total_tasks": total,
        "completed_tasks": completed,
        "percent_completed": pct,
        "tasks_this_week": len(this_week),
        "completed_this_week": completed_week,
        "insights": []
    }
    if pct >= 75:
        summary["insights"].append("Great job — you're completing most of your tasks.")
    elif pct >= 40:
        summary["insights"].append("Solid progress. Try prioritizing 1–2 key tasks per day.")
    else:
        summary["insights"].append("Low completion rate — consider shorter tasks or time-boxing.")
    return summary
