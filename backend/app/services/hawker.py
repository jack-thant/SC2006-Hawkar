from sqlalchemy.orm import Session
import json

import services.user as user_services
import schemas.hawker as hawker_schemas
import schemas.user as user_schemas
from models.hawker import Hawker
from models.user import User


def get_hawker_by_user_id(db: Session, userID: int):
    hawker = db.query(Hawker).filter(Hawker.userID == userID).first()

    # convert geometry json to dict
    hawker.geometry = json.loads(hawker.geometry)

    return hawker


def get_hawker_by_hawker_id(db: Session, hawkerID: int):
    hawker = db.query(Hawker).filter(Hawker.hawkerID == hawkerID).first()

    hawker.geometry = json.loads(hawker.geometry)

    return hawker


def get_all_hawkers(db: Session, skip: int = 0, limit: int = 100):
    hawkers = db.query(Hawker).offset(skip).limit(limit).all()

    for hawker in hawkers:
        hawker.geometry = json.loads(hawker.geometry)

    return hawkers


def create_hawker(db: Session, user: hawker_schemas.HawkerCreate):
    user_to_create = user_schemas.UserCreate(
        name=user.name,
        emailAddress=user.emailAddress,
        password=user.password,
        role=user_schemas.Role.HAWKER,
        profilePhoto=user.profilePhoto,
    )
    db_user = user_services.create_user(db, user_to_create)

    if not db_user:
        return None

    db_hawker = Hawker(
        userID=db_user.userID,
        hawkerID=db_user.userID,
        businessName=user.businessName,
        address=user.address,
        geometry=user.geometry.model_dump_json(),
        verifyStatus=True,
    )

    db.add(db_hawker)
    db.commit()
    db.refresh(db_hawker)

    # load json for response
    db_hawker.geometry = json.loads(db_hawker.geometry)

    return db_hawker


def update_hawker(db: Session, updated_hawker: hawker_schemas.HawkerUpdate):
    db_user = db.query(User).filter(User.userID == updated_hawker.userID).first()
    db_hawker = (
        db.query(Hawker).filter(Hawker.hawkerID == updated_hawker.hawkerID).first()
    )
    if not db_user or not db_hawker:
        return None

    # Update User
    updated_user_data = updated_hawker.model_dump(exclude_unset=True)
    for key, value in updated_user_data.items():
        setattr(db_user, key, value)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Update Hawker
    updated_hawker_data = updated_hawker.model_dump(exclude_unset=True)
    for key, value in updated_hawker_data.items():
        if key.lower() == "geometry":
            setattr(db_hawker, key, json.dumps(value))
        else:
            setattr(db_hawker, key, value)

    db.add(db_hawker)
    db.commit()
    db.refresh(db_hawker)
    return db_hawker
