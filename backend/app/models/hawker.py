from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped
from typing import List

from database import Base
from .user import User


class Hawker(Base):
    __tablename__ = "hawkers"

    hawkerID = Column(Integer, primary_key=True, index=True)
    address = Column(String)
    # geometry = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    verifyStatus = Column(Boolean)

    userID = Column(Integer, ForeignKey("users.userID"))
    user: Mapped["User"] = relationship("User", back_populates="hawker")
    stall: Mapped[List["Stall"]] = relationship("Stall", back_populates="hawker")
