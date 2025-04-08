from sqlalchemy.orm import Session
from fastapi import HTTPException

import schemas.review as review_schemas
from models.review import Review
from models.consumer import Consumer
from models.stall import Stall


def get_review_by_review_id(db: Session, reviewID: int):
    db_review = db.query(Review).filter(Review.reviewID == reviewID).first()

    return db_review


def get_reviews_by_consumer_id(db: Session, consumerID: int):
    db_reviews = db.query(Review).filter(Review.consumerID == consumerID).all()

    return db_reviews


def get_reviews_by_stall_id(db: Session, stallID: int):
    db_reviews = db.query(Review).filter(Review.stallID == stallID).all()

    return db_reviews


def get_all_reviews(db: Session, skip: int = 0, limit: int = 100):
    db_reviews = db.query(Review).offset(skip).limit(limit).all()

    return db_reviews


def create_review(db: Session, review: review_schemas.ReviewCreate):
    db_consumer = (
        db.query(Consumer).filter(Consumer.consumerID == review.consumerID).first()
    )
    if not db_consumer:
        raise HTTPException(status_code=400, detail="Invalid consumerID")

    db_stall = db.query(Stall).filter(Stall.stallID == review.stallID).first()
    if not db_stall:
        raise HTTPException(status_code=400, detail="Invalid stallID")

    db_review = Review(
        reviewText=review.reviewText,
        rating=review.rating,
        consumerID=review.consumerID,
        stallID=review.stallID,
        isReported=review.isReported,
        reportText=review.reportText,
        reportType=review.reportType,
    )

    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    return db_review


def update_review(db: Session, updated_review: review_schemas.ReviewUpdate):
    db_review = (
        db.query(Review).filter(Review.reviewID == updated_review.reviewID).first()
    )
    if not db_review:
        return None

    db_consumer = (
        db.query(Consumer)
        .filter(Consumer.consumerID == updated_review.consumerID)
        .first()
    )
    if not db_consumer:
        raise HTTPException(status_code=400, detail="Invalid consumerID")

    # Update Review
    updated_review_data = updated_review.model_dump(exclude_unset=True)
    for key, value in updated_review_data.items():
        setattr(db_review, key, value)

    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    return db_review


def delete_review(db: Session, reviewID: int) -> bool:
    db_review = db.query(Review).filter(Review.reviewID == reviewID).first()

    if not db_review:
        raise HTTPException(status_code=400, detail="Invalid reviewID")

    db.delete(db_review)
    db.commit()

    return True
