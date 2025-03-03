from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.consumer import ConsumerController

import schemas.consumer as consumer_schemas
import schemas.review as review_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Consumer Controller",
        "description": "API Endpoints for methods implemented by the Consumer Controller",
    },
    {"name": "Consumer (CRUD)", "description": "API CRUD Endpoints for Consumer Model"},
]

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #


@router.post(
    "/consumer-controller/submit-review",
    response_model=review_schemas.Review,
    tags=["Consumer Controller"],
)
def submit_review(review: review_schemas.ReviewCreate, db: Session = Depends(get_db)):
    return ConsumerController.submitReview(db, review)


@router.put(
    "/consumer-controller/edit-review",
    response_model=review_schemas.Review,
    tags=["Consumer Controller"],
)
def edit_review(review: review_schemas.ReviewUpdate, db: Session = Depends(get_db)):
    return ConsumerController.editReview(db, review)


# ------------------------------------------------------------ #
# -------------------- Consumer (CRUD) ----------------------- #
# ------------------------------------------------------------ #
@router.get(
    "/consumers",
    response_model=list[consumer_schemas.Consumer],
    tags=["Consumer (CRUD)"],
)
def get_all_consumers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return ConsumerController.getAllConsumers(db, skip, limit)


@router.get(
    "/consumer/{consumer_id}",
    response_model=consumer_schemas.Consumer,
    tags=["Consumer (CRUD)"],
)
async def get_consumer_by_consumer_id(consumer_id: str, db: Session = Depends(get_db)):
    return ConsumerController.getConsumerByConsumerId(db, consumer_id)


@router.get(
    "/consumer/userid/{user_id}",
    response_model=consumer_schemas.Consumer,
    tags=["Consumer (CRUD)"],
)
async def get_consumer_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return ConsumerController.getConsumerByUserId(db, user_id)


@router.put(
    "/consumer/update",
    response_model=consumer_schemas.Consumer,
    tags=["Consumer (CRUD)"],
)
def update_consumer(
    consumer: consumer_schemas.ConsumerUpdate, db: Session = Depends(get_db)
):
    return ConsumerController.updateConsumer(db, consumer)
