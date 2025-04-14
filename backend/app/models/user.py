from sqlalchemy import Column, Integer, String, Enum, Boolean
from sqlalchemy.orm import relationship, Mapped

from database import Base
from schemas.user import Role


class User(Base):
    __tablename__ = "users"

    userID = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    emailAddress = Column(String, unique=True, index=True)
    password = Column(String, nullable=True)  # Made nullable for Google users
    profilePhoto = Column(String)
    contactNumber = Column(String)
    role = Column(Enum(Role))
    isGoogleUser = Column(Boolean, default=False)

    admin: Mapped["Admin"] = relationship("Admin", back_populates="user")
    consumer: Mapped["Consumer"] = relationship("Consumer", back_populates="user")
    hawker: Mapped["Hawker"] = relationship("Hawker", back_populates="user")

    # notifications: Mapped["Notification"] = relationship(
    #     "Notification", back_populates="receiver"
    # )
    # css_history: Mapped[list["CustomerServiceSupportHistory"]] = relationship(
    #     "CustomerServiceSupportHistory", back_populates="user"
    # )
