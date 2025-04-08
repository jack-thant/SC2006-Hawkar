from pydantic import BaseModel
from typing import Optional, List


from .user import (
    User,
    UserCreate,
    UserUpdate,
    Role,
    DietaryType,
    CuisineType,
    StatusType,
)


class Consumer(BaseModel):
    consumerID: int
    address: str
    dietaryPreference: DietaryType
    preferredCuisine: CuisineType
    ambulatoryStatus: StatusType
    favoriteStalls: Optional[List[int]] = None

    userID: int
    user: User

    class ConfigDict:
        from_attributes = True


class ConsumerCreate(UserCreate):
    role: Role = Role.CONSUMER
    address: str
    dietaryPreference: Optional[DietaryType]
    preferredCuisine: Optional[CuisineType]
    ambulatoryStatus: Optional[StatusType]
    favoriteStalls: Optional[List[int]] = None


class ConsumerUpdate(UserUpdate):
    consumerID: int
    address: Optional[str]
    dietaryPreference: Optional[DietaryType]
    preferredCuisine: Optional[CuisineType]
    ambulatoryStatus: Optional[StatusType]
    favoriteStalls: Optional[List[int]] = None
