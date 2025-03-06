from pydantic import BaseModel
from typing import Optional, Union

from .user import User, UserCreate, UserUpdate, Role
from .misc import Geometry


class Hawker(BaseModel):
    hawkerID: int
    businessName: str
    contactNumber: str
    address: str
    latitude: float
    longitude: float
    # geometry: Optional[Geometry] = None
    verifyStatus: bool = False
    userID: int
    user: User

    class ConfigDict:
        from_attributes = True


class HawkerCreate(UserCreate):
    role: Role = Role.HAWKER
    businessName: str
    contactNumber: Optional[str] = None
    address: str
    latitude: float
    longitude: float
    # geometry: Optional[Geometry] = None
    verifyStatus: bool = False


class HawkerUpdate(UserUpdate):
    hawkerID: int
    contactNumber: str
    address: str
    latitude: float
    longitude: float
    # geometry: Optional[Geometry] = None
    verifyStatus: bool = False
