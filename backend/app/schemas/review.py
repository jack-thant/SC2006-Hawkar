from pydantic import BaseModel
from typing import Optional
from enum import Enum

from .consumer import Consumer
from .stall import Stall


class ReviewAction(Enum):
    DELETE = "Delete"
    IGNORE = "Ignore"
    CANCEL = "Cancel"

class ReportType(Enum):
    SPAM = "spam"
    IRRELEVANT = "irrelevant"
    OFFENSIVE = "offensive"


class Review(BaseModel):
    reviewID: int
    reviewText: str
    rating: float
    isReported: bool = False
    reportText: Optional[str] = None
    reportType: Optional[ReportType] = None

    consumerID: int
    consumer: Consumer

    stallID: int
    stall: Stall

    class ConfigDict:
        from_attributes = True


class ReviewCreate(BaseModel):
    reviewText: str
    rating: float
    isReported: bool = False
    reportText: Optional[str] = None
    reportType: Optional[ReportType] = None

    consumerID: int
    stallID: int


class ReviewUpdate(BaseModel):
    reviewID: int
    reviewText: Optional[str] = None
    rating: Optional[float] = 0.0
    isReported: Optional[bool] = False
    reportText: Optional[str] = None
    reportType: Optional[ReportType] = None

    consumerID: Optional[int] = None

class ReviewReport(BaseModel):
    reviewID: int
    reportType: ReportType
    reportText: str