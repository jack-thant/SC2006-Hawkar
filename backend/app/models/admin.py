from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base
from .user import User


class Admin(Base):
    __tablename__ = "admins"

    adminID = Column(Integer, primary_key=True, index=True)

    userID = Column(Integer, ForeignKey("users.userID"))
    user: Mapped["User"] = relationship("User", back_populates="admin")

    # notifications: Mapped["Notification"] = relationship("Notification", back_populates="admin")
    # css_history: Mapped[list["CustomerServiceSupportHistory"]] = relationship("CustomerServiceSupportHistory", back_populates="admin")
