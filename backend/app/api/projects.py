from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.models.models import User, Project, Review
from app.schemas.project import ProjectCreate, ProjectResponse
from app.schemas.review import CodeSubmission
from app.core.deps import get_current_user
from app.services.claude_service import review_code

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.post("", response_model=ProjectResponse)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_project = Project(
        name=project_data.name,
        description=project_data.description,
        user_id=current_user.id,
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project


@router.get("", response_model=List[ProjectResponse])
def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Project).filter(Project.user_id == current_user.id).all()


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = db.query(Project).filter(
        Project.id == project_id, Project.user_id == current_user.id
    ).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


@router.post("/{project_id}/submit-code")
def submit_code(
    project_id: int,
    submission: CodeSubmission,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = db.query(Project).filter(
        Project.id == project_id, Project.user_id == current_user.id
    ).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    try:
        ai_result = review_code(submission.code, submission.language)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI review failed: {str(e)}",
        )

    new_review = Review(
        project_id=project_id,
        code_snapshot=submission.code,
        language=submission.language,
        ai_response=ai_result,
        rating=ai_result.get("rating", ""),
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return {
        "id": new_review.id,
        "language": new_review.language,
        "ai_response": new_review.ai_response,
        "created_at": new_review.created_at,
    }