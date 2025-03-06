from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.review as review_services
import schemas.review as review_schemas


class ReviewController:
    # ------------------------------------------------------------ #
    # -------------------- Review (CRUD) -------------------------- #
    # ------------------------------------------------------------ #
    # ----- Review ----- #
    def getReviewByReviewId(db: Session, reviewID: int):
        review = review_services.get_review_by_review_id(db, reviewID=reviewID)
        if review is None:
            raise HTTPException(status_code=404, detail="Review not found")
        return review

    def getReviewsByConsumerId(db: Session, consumerID: int):
        review = review_services.get_reviews_by_consumer_id(db, consumerID=consumerID)
        if not review:
            raise HTTPException(
                status_code=404, detail="No review found for queried consumer id"
            )
        return review

    def getReviewsByStallId(db: Session, stallID: int):
        review = review_services.get_reviews_by_stall_id(db, stallID=stallID)
        if review == []:
            raise HTTPException(
                status_code=404, detail="No review found for queried stall id"
            )
        return review

    def getAllReviews(db: Session, skip: int, limit: int):
        reviews = review_services.get_all_reviews(db, skip=skip, limit=limit)
        return reviews

    def createReview(db: Session, review: review_schemas.ReviewCreate):
        review = review_services.create_review(db, review)
        if review is None:
            raise HTTPException(status_code=400, detail="Review cannot be created")
        return review

    def updateReview(db: Session, updated_review: review_schemas.ReviewUpdate):
        review = review_services.update_review(db, updated_review)
        if review is None:
            raise HTTPException(status_code=404, detail="Review not found")
        return review

    def deleteReview(db: Session, reviewID: int) -> bool:
        return review_services.delete_review(db, reviewID)
