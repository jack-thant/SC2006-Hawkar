from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.review as review_services
import schemas.review as review_schemas

from services.consumer import convert_favorite_stalls_to_list
from services.stall import convert_str_to_list


def convert_db_review_to_list(review):
    # if review.consumer and hasattr(review.consumer, "favoriteStalls"):
    #     review.consumer.favoriteStalls = convert_favorite_stalls_to_list(
    #         review.consumer.favoriteStalls
    #     )

    if review.stall:
        if hasattr(review.stall, "images"):
            review.stall.images = convert_str_to_list(review.stall.images)
        if hasattr(review.stall, "cuisineType"):
            review.stall.cuisineType = convert_str_to_list(review.stall.cuisineType)

    return review


class ReviewController:
    # ------------------------------------------------------------ #
    # -------------------- Review (CRUD) -------------------------- #
    # ------------------------------------------------------------ #
    # ----- Review ----- #
    def getReviewByReviewId(db: Session, reviewID: int):
        review = review_services.get_review_by_review_id(db, reviewID=reviewID)
        review = convert_db_review_to_list(review)
        if review is None:
            raise HTTPException(status_code=404, detail="Review not found")
        return review

    def getReviewsByConsumerId(db: Session, consumerID: int):
        reviews = review_services.get_reviews_by_consumer_id(db, consumerID=consumerID)
        if not reviews:
            raise HTTPException(
                status_code=404, detail="No review found for queried consumer id"
            )
        for review in reviews:
            review = convert_db_review_to_list(review)
        return reviews

    def getReviewsByStallId(db: Session, stallID: int):
        reviews = review_services.get_reviews_by_stall_id(db, stallID=stallID)
        if reviews == []:
            raise HTTPException(
                status_code=404, detail="No review found for queried stall id"
            )
        for review in reviews:
            review = convert_db_review_to_list(review)
        return reviews

    def getAllReviews(db: Session, skip: int, limit: int):
        reviews = review_services.get_all_reviews(db, skip=skip, limit=limit)
        for review in reviews:
            review = convert_db_review_to_list(review)
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

    def deleteReview(db: Session, reviewID: int):
        return review_services.delete_review(db, reviewID)

    def reportReview(db: Session, reviewID: int, reportType: str, reportText: str):
        review = review_services.report_review(db, reviewID, reportType, reportText)
        return review
