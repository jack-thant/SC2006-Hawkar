from pydantic import BaseModel
from typing import Optional
from enum import Enum

from .hawker import Hawker


class CuisineType(Enum):
    CHINESE = "Chinese"
    INDIAN = "Indian"
    MALAY = "Malay"
    WESTERN = "Western"
    JAPANESE = "Japanese"
    KOREAN = "Korean"
    THAI = "Thai"
    VIETNAMESE = "Vietnamese"
    FUSION = "Fusion"
    OTHERS = "Others"


class Stall(BaseModel):
    stallID: int
    stallName: str
    hawkerID: int
    hawker: Hawker
    unitNumber: str
    openStatus: bool
    operatingHours: Optional[str] = None
    hygieneRating: Optional[float] = None
    cuisineType: Optional[CuisineType] = None
    estimatedWaitTime: Optional[int] = None

    class ConfigDict:
        from_attributes = True


class StallCreate(BaseModel):
    stallName: str
    hawkerID: int
    unitNumber: str
    openStatus: bool
    operatingHours: Optional[str] = None
    hygieneRating: Optional[float] = None
    cuisineType: Optional[CuisineType] = None
    estimatedWaitTime: Optional[int] = None


class StallUpdate(BaseModel):
    stallID: int
    stallName: Optional[str] = None
    hawkerID: Optional[int] = None
    unitNumber: Optional[str] = None
    openStatus: Optional[bool] = None
    operatingHours: Optional[str] = None
    hygieneRating: Optional[float] = None
    cuisineType: Optional[CuisineType] = None
    estimatedWaitTime: Optional[int] = None
