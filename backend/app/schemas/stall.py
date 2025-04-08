from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
from datetime import time

from .hawker import Hawker
from .hawkerCenter import HawkerCenter
from .user import CuisineType, HygieneRating


class Stall(BaseModel):
    stallID: int
    stallName: str
    hawkerID: int
    hawker: Hawker
    hawkerCenterID: Optional[int] = None
    hawkerCenter: HawkerCenter
    images: Optional[List[str]] = None
    unitNumber: str
    startTime: time
    endTime: time
    hygieneRating: Optional[str] = None
    cuisineType: Optional[str] = None
    estimatedWaitTime: Optional[int] = None
    priceRange: Optional[str] = None

    class ConfigDict:
        from_attributes = True


class StallCreate(BaseModel):
    stallName: str
    hawkerID: int
    hawkerCenterID: Optional[int] = None
    images: Optional[List[str]] = None
    unitNumber: str
    startTime: time
    endTime: time
    hygieneRating: Optional[str] = None
    cuisineType: Optional[str] = None
    estimatedWaitTime: Optional[int] = None
    priceRange: Optional[str] = None


class StallUpdate(BaseModel):
    stallID: int
    stallName: Optional[str] = None
    hawkerID: Optional[int] = None
    hawkerCenterID: Optional[int] = None
    images: Optional[List[str]] = None
    unitNumber: str
    startTime: time
    endTime: time
    hygieneRating: Optional[str] = None
    cuisineType: Optional[str] = None
    estimatedWaitTime: Optional[int] = None
    priceRange: Optional[str] = None
