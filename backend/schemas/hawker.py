from pydantic import BaseModel

from .user import User, UserCreate, UserUpdate, Role
from .misc import Geometry


class Hawker(BaseModel):
    hawkerID: int
    businessName: str
    contactNumber: str
    verifyStatus: bool = False
    geometry: Geometry
    address: str
    userID: int
    user: User

    class Config:
        orm_mode = True


class HawkerCreate(UserCreate):
    role: Role = Role.HAWKER
    contactNumber: str
    verifyStatus: bool
    geometry: Geometry
    address: str


class HawkerUpdate(UserUpdate):
    hawkerID: int
    contactNumber: str
    verifyStatus: bool
    geometry: Geometry
    address: str
