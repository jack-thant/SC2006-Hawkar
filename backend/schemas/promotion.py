from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Promotion(BaseModel):
    promotionID: int
    dishID: int
    startDate: datetime
    endDate: datetime
    discountedPrice: float

    class Config:
        orm_mode = True


class PromotionCreate(BaseModel):
    dishID: int
    startDate: datetime
    endDate: datetime
    discountedPrice: float


class PromotionUpdate(BaseModel):
    promotionID: int
    dishID: Optional[int] = None
    startDate: Optional[datetime] = None
    endDate: Optional[datetime] = None
    discountedPrice: Optional[float] = None
