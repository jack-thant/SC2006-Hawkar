from pydantic import BaseModel

from .user import User, UserCreate, UserUpdate, Role


class Consumer(BaseModel):
    consumerID: int
    userID: int
    user: User

    class ConfigDict:
        from_attributes = True


class ConsumerCreate(UserCreate):
    role: Role = Role.CONSUMER


class ConsumerUpdate(UserUpdate):
    consumerID: int
