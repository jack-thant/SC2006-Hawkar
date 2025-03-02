from pydantic import BaseModel
from typing import Optional


class Dish(BaseModel):
    dishID: int
    stallID: int
    dishName: str
    price: float
    photo: Optional[str] = None

    class Config:
        from_attributes = True


class DishCreate(BaseModel):
    stallID: int
    dishName: str
    price: float
    photo: Optional[str] = None


class DishUpdate(BaseModel):
    dishID: int
    stallID: Optional[int] = None
    dishName: Optional[str] = None
    price: Optional[float] = None
    photo: Optional[str] = None
