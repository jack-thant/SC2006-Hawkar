from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship, Mapped

from database import Base


class Promotion(Base):
    __tablename__ = "promotions"

    promotionID = Column(Integer, primary_key=True, index=True)
    startDate = Column(DateTime)
    endDate = Column(DateTime)
    discountedPrice = Column(Float)

    dishID = Column(Integer, ForeignKey("dishes.dishID"))
    dish: Mapped["Dish"] = relationship("Dish", back_populates="promotions")
