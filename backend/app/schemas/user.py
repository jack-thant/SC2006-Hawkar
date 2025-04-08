from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Literal, Any
from enum import Enum


class Role(Enum):
    ADMIN = "Admin"
    CONSUMER = "Consumer"
    HAWKER = "Hawker"


class DietaryType(Enum):
    Vegetarian = "Vegetarian"
    Vegan = "Vegan"
    Halal = "Halal"
    GlutenFree = "Gluten-Free"
    DairyFree = "Dairy-Free"
    Normal = "Normal"


class CuisineType(Enum):
    Chinese = "Chinese"
    Indian = "Indian"
    Malay = "Malay"
    Western = "Western"
    Japanese = "Japanese"
    Korean = "Korean"
    Thai = "Thai"
    Italian = "Italian"
    Indonesian = "Indonesian"
    Vietnamese = "Vietnamese"


class StatusType(Enum):
    Ambulatory = "Ambulatory"
    Wheelchair = "Wheelchair"
    Normal = "Normal"


class HygieneRating(Enum):
    A = "A"
    B = "B"
    C = "C"


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
