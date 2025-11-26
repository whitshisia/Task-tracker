from fastapi import FastAPI, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from database import init_db, get_session
from crud import create_user, login_user, create_task, get_tasks, update_task, delete_task, sync_tasks, ai_summary
from auth import hash_password, verify_password, create_access_token, get_current_user
from models import User

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

# --- AUTH ---
@app.post("/signup")
def signup(username: str, password: str, session: Session = Depends(get_session)):
    user = create_user(session, username, password)
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "user": user}

@app.post("/login")
def login(username: str, password: str, session: Session = Depends(get_session)):
    return login_user(session, username, password)

@app.get("/me")
def me(current_user: User = Depends(get_current_user)):
    return current_user

# --- TASKS ---
@app.get("/tasks")
def list_tasks(session: Session = Depends(get_session), user=Depends(get_current_user)):
    return get_tasks(session, user.id)

@app.post("/tasks")
def add_task(payload: dict = Body(...), session: Session = Depends(get_session), user=Depends(get_current_user)):
    return create_task(session, payload.get("title"), payload.get("description"), user.id)

@app.patch("/tasks/{task_id}")
def patch_task(task_id: int, payload: dict = Body(...), session: Session = Depends(get_session), user=Depends(get_current_user)):
    return update_task(session, task_id, payload, user.id)

@app.delete("/tasks/{task_id}")
def remove_task(task_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    return delete_task(session, task_id, user.id)

@app.post("/sync")
def sync_endpoint(payload: dict = Body(...), session: Session = Depends(get_session), user=Depends(get_current_user)):
    client_tasks = payload.get("tasks", [])
    server_tasks = sync_tasks(session, user.id, client_tasks)
    return [t.dict() for t in server_tasks]

@app.get("/summary")
def summary(session: Session = Depends(get_session), user=Depends(get_current_user)):
    return ai_summary(session, user.id)
