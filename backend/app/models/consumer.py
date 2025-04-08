from sqlalchemy import Column, Integer, Boolean, ForeignKey, String, Enum
from sqlalchemy.orm import relationship, Mapped

from database import Base
from .user import User
from schemas.user import DietaryType, CuisineType, StatusType


class Consumer(Base):
    __tablename__ = "consumers"

    consumerID = Column(Integer, primary_key=True, index=True)
    address = Column(String)
    dietaryPreference = Column(Enum(DietaryType))
    preferredCuisine = Column(Enum(CuisineType))
    ambulatoryStatus = Column(Enum(StatusType))
    favoriteStalls = Column(String)

    userID = Column(Integer, ForeignKey("users.userID"))
    user: Mapped["User"] = relationship("User", back_populates="consumer")
    reviews: Mapped[list["Review"]] = relationship("Review", back_populates="consumer")
