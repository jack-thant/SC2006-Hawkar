from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Enum
from sqlalchemy.orm import relationship, Mapped

from database import Base
from schemas.review import ReportType


class Review(Base):
    __tablename__ = "reviews"

    reviewID = Column(Integer, primary_key=True, index=True)
    reviewText = Column(String)
    rating = Column(Integer)
    isReported = Column(Boolean)
    reportType = Column(Enum(ReportType))
    reportText = Column(String)

    consumerID = Column(Integer, ForeignKey("consumers.consumerID"))
    consumer: Mapped["Consumer"] = relationship("Consumer", back_populates="reviews")

    stallID = Column(Integer, ForeignKey("stalls.stallID"))
    stall: Mapped["Stall"] = relationship("Stall", back_populates="reviews")
