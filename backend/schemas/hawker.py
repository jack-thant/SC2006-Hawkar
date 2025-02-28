from pydantic import BaseModel

from .user import User, UserCreate, UserUpdate, Role
from .misc import Geometry


class Hawker(BaseModel):
    hawkerID: int
    contactNumber: str
    verifyStatus: bool
    location: Geometry
    userID: int
    user: User

    class Config:
        orm_mode = True


class HawkerCreate(UserCreate):
    role: Role = Role.HAWKER
    contactNumber: str
    verifyStatus: bool
    location: Geometry


class HawkerUpdate(UserUpdate):
    hawkerID: int
    contactNumber: str
    verifyStatus: bool
    location: Geometry
