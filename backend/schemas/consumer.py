from pydantic import BaseModel

from .user import User, UserCreate, UserUpdate, Role


class Consumer(BaseModel):
    consumerID: int
    userID: int
    user: User

    class Config:
        orm_mode = True


class ConsumerCreate(UserCreate):
    role: Role = Role.CONSUMER


class ConsumerUpdate(UserUpdate):
    consumerID: int
