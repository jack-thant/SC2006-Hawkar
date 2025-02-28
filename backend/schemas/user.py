from pydantic import BaseModel, EmailStr
from typing import Optional
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
    role: Role

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    password: str
    role: Role
    profilePhoto: str


class UserUpdate(UserBase):
    userID: int
    profilePhoto: Optional[str] = ""


class UserLogin(BaseModel):
    emailAddress: EmailStr
    password: str
