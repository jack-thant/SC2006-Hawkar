from sqlalchemy import Column, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base
from .user import User


class Consumer(Base):
    __tablename__ = "consumers"

    consumerID = Column(Integer, primary_key=True, index=True)

    userID = Column(Integer, ForeignKey("users.userID"))
    user: Mapped["User"] = relationship("User", back_populates="consumer")
    reviews: Mapped[list["Review"]] = relationship("Review", back_populates="consumer")
    # pickup_jobs: Mapped[list["PickupJob"]] = relationship("PickupJob", back_populates="consumer")
    # priority_requests: Mapped[list["PriorityRequest"]] = relationship("PriorityRequest", back_populates="consumer")
