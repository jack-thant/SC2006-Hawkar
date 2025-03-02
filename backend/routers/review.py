from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from controllers.review import ReviewController
import schemas.review as review_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Review Controller",
        "description": "API Endpoints for methods implemented by the Review Controller",
    },
    {"name": "Review (CRUD)", "description": "API CRUD Endpoints for Review Model"},
]

# ------------------------------------------------------------ #
# -------------------- Review (CRUD) ------------------------- #
# ------------------------------------------------------------ #


@router.get(
    "/reviews", response_model=list[review_schemas.Review], tags=["Review (CRUD)"]
)
def get_all_reviewes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return ReviewController.getAllReviews(db, skip, limit)


@router.get(
    "/review/{review_id}", response_model=review_schemas.Review, tags=["Review (CRUD)"]
)
async def get_review_by_review_id(review_id: str, db: Session = Depends(get_db)):
    return ReviewController.getReviewByReviewId(db, review_id)


@router.get(
    "/review/stallid/{stall_id}",
    response_model=review_schemas.Review,
    tags=["Review (CRUD)"],
)
async def get_review_by_stall_id(stall_id: str, db: Session = Depends(get_db)):
    return ReviewController.getReviewsByStallId(db, stall_id)


@router.get(
    "/review/userid/{user_id}",
    response_model=review_schemas.Review,
    tags=["Review (CRUD)"],
)
async def get_review_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return ReviewController.getReviewsByConsumerId(db, user_id)


@router.put(
    "/review/update", response_model=review_schemas.Review, tags=["Review (CRUD)"]
)
def update_review(review: review_schemas.ReviewUpdate, db: Session = Depends(get_db)):
    return ReviewController.updateReview(db, review)
