from pydantic import BaseModel
from typing import Optional


class Review(BaseModel):
    reviewID: int
    stallID: int
    rating: float
    reviewText: Optional[str] = None

    class Config:
        orm_mode = True


class ReviewCreate(BaseModel):
    stallID: int
    rating: float
    reviewText: Optional[str] = None


class ReviewUpdate(BaseModel):
    reviewID: int
    stallID: Optional[int] = None
    rating: Optional[float] = None
    reviewText: Optional[str] = None
