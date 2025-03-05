from pydantic import BaseModel
from typing import Optional, Union

from .user import User, UserCreate, UserUpdate, Role
from .misc import Geometry


class Hawker(BaseModel):
    hawkerID: int
    businessName: str
    contactNumber: str
    verifyStatus: bool = False
    latitude: float
    longitude: float
    # geometry: Optional[Geometry] = None
    address: str
    userID: int
    user: User

    class ConfigDict:
        from_attributes = True


class HawkerCreate(UserCreate):
    role: Role = Role.HAWKER
    businessName: str
    address: str
    # geometry: Optional[Geometry] = None
    latitude: float
    longitude: float
    contactNumber: Optional[str] = None
    verifyStatus: bool = False


class HawkerUpdate(UserUpdate):
    hawkerID: int
    contactNumber: str
    verifyStatus: bool
    # geometry: Union[Geometry, str]
    latitude: float
    longitude: float
    address: str
