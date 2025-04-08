from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped
from typing import List

from database import Base
from .user import User


class HawkerCenter(Base):
    __tablename__ = "hawkerCenters"

    hawkerCenterID = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    address = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)

    stalls: Mapped[List["Stall"]] = relationship("Stall", back_populates="hawkerCenter")
