from sqlalchemy import Column, Integer, String, Boolean, Float, Enum, ForeignKey
from sqlalchemy.orm import relationship, Mapped
from typing import List

from database import Base
from schemas.stall import CuisineType


class Stall(Base):
    __tablename__ = "stalls"

    stallID = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    unitNumber = Column(String)
    openStatus = Column(Boolean)
    operatingHours = Column(String)
    hygieneRating = Column(Float)
    cuisineType = Column(Enum(CuisineType))
    estimatedWaitTime = Column(Integer)

    hawkerID = Column(Integer, ForeignKey("hawkers.hawkerID"))
    hawker: Mapped["Hawker"] = relationship("Hawker", back_populates="stall")

    reviews: Mapped[List["Review"]] = relationship("Review", back_populates="stall")
    dishes: Mapped[List["Dish"]] = relationship("Dish", back_populates="stall")