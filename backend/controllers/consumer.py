from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.consumer as consumer_services
import services.review as review_services

import schemas.consumer as consumer_schemas
import schemas.review as review_schemas


class ConsumerController:
    # -------------------------------------------------------- #
    # -------------------- Business Logic -------------------- #
    # -------------------------------------------------------- #

    def submitReview(db: Session, review: review_schemas.ReviewCreate):
        db_review = review_services.create_review(db, review)
        return db_review

    def editReview(db: Session, updated_review: review_schemas.ReviewUpdate):
        db_review = review_services.update_review(db, updated_review)
        return db_review

    # ------------------------------------------------------------ #
    # -------------------- Consumer (CRUD) ----------------------- #
    # ------------------------------------------------------------ #
    # ----- Consumer ----- #
    def getConsumerByUserId(db: Session, userID: int):
        consumer = consumer_services.get_consumer_by_user_id(db, userID=userID)
        if consumer is None:
            raise HTTPException(status_code=404, detail="Consumer not found")
        return consumer

    def getConsumerByConsumerId(db: Session, consumerID: int):
        consumer = consumer_services.get_consumer_by_consumer_id(
            db, consumerID=consumerID
        )
        if consumer is None:
            raise HTTPException(status_code=404, detail="Consumer not found")
        return consumer

    def getAllConsumers(db: Session, skip: int, limit: int):
        consumers = consumer_services.get_all_consumers(db, skip=skip, limit=limit)
        return consumers

    def updateConsumer(db: Session, updated_consumer: consumer_schemas.ConsumerUpdate):
        consumer = consumer_services.update_consumer(db, updated_consumer)
        if consumer is None:
            raise HTTPException(status_code=404, detail="Consumer not found")
        return consumer
