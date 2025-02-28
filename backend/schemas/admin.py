from pydantic import BaseModel

from .user import User, UserCreate, UserUpdate, Role


class Admin(BaseModel):
    adminID: int
    userID: int
    user: User

    class Config:
        orm_mode = True


class AdminCreate(UserCreate):
    role: Role = Role.ADMIN


class AdminUpdate(UserUpdate):
    adminID: int
