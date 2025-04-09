from sqlalchemy import Column, Integer, String, Boolean, Float, Enum, ForeignKey, Time
from sqlalchemy.orm import relationship, Mapped
from typing import List

from database import Base
from schemas.user import CuisineType, HygieneRating


class Stall(Base):
    __tablename__ = "stalls"

    stallID = Column(Integer, primary_key=True, index=True)
    stallName = Column(String)
    images = Column(String)
    unitNumber = Column(String)
    startTime = Column(Time)
    endTime = Column(Time)
    hygieneRating = Column(Enum(HygieneRating))
    cuisineType = Column(String, Enum(CuisineType))
    estimatedWaitTime = Column(Integer)
    priceRange = Column(String)

    hawkerID = Column(Integer, ForeignKey("hawkers.hawkerID"))
    hawker: Mapped["Hawker"] = relationship("Hawker", back_populates="stall")

    hawkerCenterID = Column(Integer, ForeignKey("hawkerCenters.hawkerCenterID"))
    hawkerCenter: Mapped["HawkerCenter"] = relationship(
        "HawkerCenter", back_populates="stalls"
    )

    reviews: Mapped[List["Review"]] = relationship("Review", back_populates="stall")
    dishes: Mapped[List["Dish"]] = relationship("Dish", back_populates="stall")
