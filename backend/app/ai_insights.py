from sqlalchemy.orm import Session
from sqlalchemy import and_, func
from datetime import datetime, timedelta
from typing import List
import random

from . import schemas, models

def generate_summary(db: Session, user_id: str) -> schemas.Summary:
    # Get all tasks for user
    tasks = db.query(models.Task).filter(models.Task.user_id == user_id).all()
    
    # Calculate basic metrics
    total_tasks = len(tasks)
    completed_tasks = sum(1 for task in tasks if task.completed)
    completion_percentage = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    
    # Calculate weekly metrics
    week_ago = datetime.utcnow() - timedelta(days=7)
    tasks_this_week = sum(1 for task in tasks if task.created_at >= week_ago)
    completed_this_week = sum(1 for task in tasks if task.completed and task.completed_at and task.completed_at >= week_ago)
    weekly_completion_percentage = (completed_this_week / tasks_this_week * 100) if tasks_this_week > 0 else 0
    
    # Generate insights
    insights = generate_insights(
        total_tasks, 
        completed_tasks, 
        completion_percentage,
        tasks_this_week,
        completed_this_week
    )
    
    # Calculate productivity score (0-100)
    productivity_score = calculate_productivity_score(
        completion_percentage,
        weekly_completion_percentage,
        tasks_this_week
    )
    
    return schemas.Summary(
        total_tasks=total_tasks,
        completed_tasks=completed_tasks,
        completion_percentage=round(completion_percentage, 1),
        tasks_this_week=tasks_this_week,
        completed_this_week=completed_this_week,
        weekly_completion_percentage=round(weekly_completion_percentage, 1),
        insights=insights,
        productivity_score=round(productivity_score, 1)
    )

def generate_insights(total_tasks, completed_tasks, completion_percentage, weekly_tasks, weekly_completed):
    insights = []
    
    if total_tasks == 0:
        insights.extend([
            "Welcome! Start by creating your first task.",
            "Your productivity journey begins now!",
            "No tasks yet - time to get organized!"
        ])
        return insights[:2]  # Return only 2 insights
    
    # Completion-based insights
    if completion_percentage >= 80:
        insights.append("Excellent work! You're completing most of your tasks.")
    elif completion_percentage >= 60:
        insights.append("Good progress! You're maintaining solid productivity.")
    elif completion_percentage >= 40:
        insights.append("Steady progress! Keep focusing on your priorities.")
    else:
        insights.append("Consider breaking down larger tasks into smaller steps.")
    
    # Weekly activity insights
    if weekly_tasks > 10:
        insights.append("You're very active this week! Great momentum.")
    elif weekly_tasks > 5:
        insights.append("Good weekly activity level. Keep it up!")
    else:
        insights.append("Consider adding more tasks to build momentum.")
    
    # Productivity tips
    productivity_tips = [
        "Try time-blocking for better focus.",
        "Review your tasks each morning to set daily priorities.",
        "Break large tasks into smaller, manageable steps.",
        "Celebrate your completed tasks - it builds motivation!",
        "Use the Kanban status to visualize your workflow.",
    ]
    
    # Add random productivity tip
    insights.append(random.choice(productivity_tips))
    
    # Completion streak insight
    if weekly_completed >= 5:
        insights.append("You're on a completion streak! This builds great habits.")
    
    return insights[:3]  # Return max 3 insights

def calculate_productivity_score(completion_percentage, weekly_completion, weekly_tasks):
    """Calculate a productivity score from 0-100"""
    base_score = completion_percentage * 0.6  # 60% weight on overall completion
    
    weekly_score = min(weekly_completion, 100) * 0.3  # 30% weight on weekly completion
    
    # Activity bonus (up to 10%)
    activity_bonus = min(weekly_tasks * 2, 10)  # 2 points per task, max 10
    
    total_score = base_score + weekly_score + activity_bonus
    return min(total_score, 100)  # Cap at 100