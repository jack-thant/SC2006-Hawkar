from pydantic import BaseModel
from typing import Optional
from enum import Enum

from .consumer import Consumer
from .stall import Stall


class ReviewAction(Enum):
    DELETE = "Delete"
    IGNORE = "Ignore"
    CANCEL = "Cancel"


class Review(BaseModel):
    reviewID: int
    rating: float
    reviewText: Optional[str] = ""

    consumerID: int
    consumer: Consumer

    stallID: int
    stall: Stall

    class ConfigDict:
        from_attributes = True


class ReviewCreate(BaseModel):
    reviewText: str
    rating: float

    consumerID: int
    stallID: int


class ReviewUpdate(BaseModel):
    reviewID: int
    reviewText: str
    rating: float

    consumerID: int
