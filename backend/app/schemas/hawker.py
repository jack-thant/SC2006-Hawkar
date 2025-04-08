from pydantic import BaseModel
from typing import Optional, Union

from .user import User, UserCreate, UserUpdate, Role
from .misc import Geometry


class Hawker(BaseModel):
    hawkerID: int
    address: str
    license: str
    verifyStatus: bool = False
    userID: int
    user: User

    class ConfigDict:
        from_attributes = True


class HawkerCreate(UserCreate):
    role: Role = Role.HAWKER
    address: str
    license: str
    verifyStatus: bool = False


class HawkerUpdate(UserUpdate):
    hawkerID: int
    address: str
    license: str
    verifyStatus: bool = False
