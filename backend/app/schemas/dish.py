from pydantic import BaseModel
from typing import Optional


class Dish(BaseModel):
    dishID: int
    stallID: Optional[int] = None  # Changed to Optional with None default
    dishName: str
    price: float
    photo: Optional[str] = None
    onPromotion: Optional[bool] = False

    class ConfigDict:
        from_attributes = True


class DishCreate(BaseModel):
    stallID: int
    dishName: str
    price: float
    photo: Optional[str] = None
    onPromotion: Optional[bool] = False


class DishUpdate(BaseModel):
    dishID: int
    stallID: Optional[int] = None
    dishName: Optional[str] = None
    price: Optional[float] = None
    photo: Optional[str] = None
    onPromotion: Optional[bool] = False
