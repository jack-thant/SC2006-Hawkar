from sqlalchemy import Column, Integer, Boolean, ForeignKey, String
from sqlalchemy.orm import relationship, Mapped

from database import Base
from .user import User


class Consumer(Base):
    __tablename__ = "consumers"

    consumerID = Column(Integer, primary_key=True, index=True)
    # address = Column(String)
    # dietaryPreference = Column(String)
    # preferredCuisines = Column(String)

    userID = Column(Integer, ForeignKey("users.userID"))
    user: Mapped["User"] = relationship("User", back_populates="consumer")
    reviews: Mapped[list["Review"]] = relationship("Review", back_populates="consumer")
