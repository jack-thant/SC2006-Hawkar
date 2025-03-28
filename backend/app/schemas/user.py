from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Literal, Any
from enum import Enum


class Role(Enum):
    ADMIN = "Admin"
    CONSUMER = "Consumer"
    HAWKER = "Hawker"


class UserBase(BaseModel):
    name: str
    emailAddress: EmailStr


class User(UserBase):
    userID: int
    profilePhoto: Optional[str] = ""
    contactNumber: Optional[str] = ""
    role: Role

    class ConfigDict:
        from_attributes = True


class UserCreate(UserBase):
    password: str
    role: Role
    profilePhoto: Optional[str] = ""
    contactNumber: Optional[str] = ""


class UserUpdate(UserBase):
    userID: int
    profilePhoto: Optional[str] = ""
    contactNumber: Optional[str] = ""


class UserLogin(BaseModel):
    emailAddress: EmailStr
    password: str


class UserSignup(BaseModel):
    userType: Literal["admin", "consumer", "hawker"]
    data: Dict[str, Any]
