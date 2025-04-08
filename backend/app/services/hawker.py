from sqlalchemy.orm import Session
from fastapi import HTTPException

import services.user as user_services
import schemas.hawker as hawker_schemas
import schemas.user as user_schemas
from models.hawker import Hawker
from models.user import User

from search.hawker_dish_trie import hawker_dish_search


def get_hawker_by_user_id(db: Session, userID: int):
    hawker = db.query(Hawker).filter(Hawker.userID == userID).first()

    if not hawker:
        raise HTTPException(status_code=404, detail="Hawker not found")

    # # convert geometry json to dict
    # hawker.geometry = json.loads(hawker.geometry)

    return hawker


def get_hawker_by_hawker_id(db: Session, hawkerID: int):
    hawker = db.query(Hawker).filter(Hawker.hawkerID == hawkerID).first()

    if not hawker:
        raise HTTPException(status_code=404, detail="Hawker not found")

    # hawker.geometry = json.loads(hawker.geometry)

    return hawker


def get_all_hawkers(db: Session, skip: int = 0, limit: int = 100):
    hawkers = db.query(Hawker).offset(skip).limit(limit).all()

    # for hawker in hawkers:
    #     hawker.geometry = json.loads(hawker.geometry)

    return hawkers


def create_hawker(db: Session, user: hawker_schemas.HawkerCreate):
    db_user = db.query(User).filter(User.emailAddress == user.emailAddress).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_to_create = user_schemas.UserCreate(
        name=user.name,
        emailAddress=user.emailAddress,
        password=user.password,
        role=user_schemas.Role.HAWKER,
        profilePhoto=user.profilePhoto,
        contactNumber=user.contactNumber
    )
    db_user = user_services.create_user(db, user_to_create)

    if not db_user:
        return None

    # # Convert geometry to JSON string if it's not already
    # geometry_json = (
    #     user.geometry.model_dump_json()
    #     if hasattr(user.geometry, "model_dump_json")
    #     else json.dumps(user.geometry)
    # )

    db_hawker = Hawker(
        userID=db_user.userID,
        hawkerID=db_user.userID,
        address=user.address,
        # geometry=geometry_json,
        latitude=user.latitude,
        longitude=user.longitude,
        contactNumber=user.contactNumber if hasattr(user, "contactNumber") else None,
        verifyStatus=user.verifyStatus if hasattr(user, "verifyStatus") else False,
    )

    db.add(db_hawker)
    db.commit()
    db.refresh(db_hawker)

    # Update Hawker Trie Search Index
    hawker_dish_search.add_hawker(db_hawker.businessName, db_hawker.hawkerID)

    # # load json for response
    # db_hawker.geometry = json.loads(db_hawker.geometry)

    return db_hawker


def update_hawker(db: Session, updated_hawker: hawker_schemas.HawkerUpdate):
    db_user = db.query(User).filter(User.userID == updated_hawker.userID).first()
    db_hawker = (
        db.query(Hawker).filter(Hawker.hawkerID == updated_hawker.hawkerID).first()
    )
    if not db_user or not db_hawker:
        return None

    # Store old name for trie update
    old_hawker_name = db_hawker.businessName

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
        setattr(db_hawker, key, value)
        # if key.lower() == "geometry":
        #     setattr(db_hawker, key, json.dumps(value))
        # else:
        #     setattr(db_hawker, key, value)

    db.add(db_hawker)
    db.commit()
    db.refresh(db_hawker)

    # Update search index if name changed
    if old_hawker_name != db_hawker.businessName:
        hawker_dish_search.update_hawker(
            old_hawker_name,
            {"hawkerID": db_hawker.hawkerID, "businessName": db_hawker.businessName},
        )

    return db_hawker


def delete_hawker(db: Session, hawkerID: int) -> bool:
    db_hawker = db.query(Hawker).filter(Hawker.hawkerID == hawkerID).first()

    if not db_hawker:
        raise HTTPException(status_code=400, detail="Invalid hawkerID")

    hawker_dish_search.remove_hawker(db_hawker.businessName)

    db.delete(db_hawker)
    db.commit()

    return True
