from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class LikeStall(BaseModel):
    stallID: int
    userID: int

    class ConfigDict:
        from_attributes = True


class LikedStallByUserID(BaseModel):
    stallID: Optional[int] = None
