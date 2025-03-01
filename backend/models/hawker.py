from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped
from typing import List

from database import Base
from .user import User


class Hawker(Base):
    __tablename__ = "hawkers"

    hawkerID = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    contactNumber = Column(String)
    verifyStatus = Column(Boolean)
    location = Column(String)

    userID = Column(Integer, ForeignKey("users.userID"))
    user: Mapped["User"] = relationship("User", back_populates="hawker")
    stall: Mapped[List["Stall"]] = relationship("Stall", back_populates="hawker")
