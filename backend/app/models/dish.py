from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base


class Dish(Base):
    __tablename__ = "dishes"

    dishID = Column(Integer, primary_key=True, index=True)
    dishName = Column(String)
    price = Column(Float)
    photo = Column(String)

    stallID = Column(Integer, ForeignKey("stalls.stallID"))
    stall: Mapped["Stall"] = relationship("Stall", back_populates="dishes")

    promotions: Mapped["Promotion"] = relationship("Promotion", back_populates="dishes")
