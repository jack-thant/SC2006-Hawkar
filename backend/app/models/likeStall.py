from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

from database import Base

class LikeStall(Base):
    __tablename__ = "like_stalls"

    id = Column(Integer, primary_key=True, index=True)
    userID = Column(Integer, ForeignKey("users.userID"), nullable=False)
    stallID = Column(Integer, ForeignKey("stalls.stallID"), nullable=False)
    
    # Create relationships for convenient access
    user = relationship("User", backref="liked_stalls")
    stall = relationship("Stall", backref="user_likes")
    
    # Ensure a user can only like a stall once
    __table_args__ = (UniqueConstraint('userID', 'stallID', name='_user_stall_uc'),) 