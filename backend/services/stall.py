from sqlalchemy.orm import Session
from fastapi import HTTPException
import json

import schemas.stall as stall_schemas
from models.stall import Stall
from models.hawker import Hawker


def get_stall_by_stall_id(db: Session, stallID: int):
    db_stall = db.query(Stall).filter(Stall.stallID == stallID).first()

    if not db_stall:
        raise HTTPException(status_code=400, detail="Invalid stallID")

    # convert geometry json to dict
    if db_stall.hawker:
        db_stall.hawker.geometry = json.loads(db_stall.hawker.geometry)

    return db_stall


def get_stalls_by_hawker_id(db: Session, hawkerID: int):
    db_stalls = db.query(Stall).filter(Stall.hawkerID == hawkerID)

    if not db_stalls:
        raise HTTPException(status_code=400, detail="Invalid hawkerID")

    for db_stall in db_stalls:
        if db_stall.hawker and not isinstance(db_stall.hawker.geometry, dict):
            db_stall.hawker.geometry = json.loads(db_stall.hawker.geometry)

    return db_stalls


def get_all_stalls(db: Session, skip: int = 0, limit: int = 100):
    db_stalls = db.query(Stall).offset(skip).limit(limit).all()

    for db_stall in db_stalls:
        if db_stall.hawker and not isinstance(db_stall.hawker.geometry, dict):
            db_stall.hawker.geometry = json.loads(db_stall.hawker.geometry)

    return db_stalls


def create_stall(db: Session, stall: stall_schemas.StallCreate):
    db_hawker = db.query(Hawker).filter(Hawker.hawkerID == stall.hawkerID).first()
    if not db_hawker:
        raise HTTPException(status_code=400, detail="Invalid hawkerID")

    db_stall = Stall(
        stallName=stall.stallName,
        hawkerID=stall.hawkerID,
        unitNumber=stall.unitNumber,
        openStatus=stall.openStatus,
        operatingHours=stall.operatingHours,
        hygieneRating=stall.hygieneRating,
        cuisineType=stall.cuisineType,
        estimatedWaitTime=stall.estimatedWaitTime,
    )

    db.add(db_stall)
    db.commit()
    db.refresh(db_stall)

    if db_hawker.hawker:
        db_hawker.hawker.geometry = json.loads(db_hawker.hawker.geometry)

    return db_stall


def update_stall(db: Session, updated_stall: stall_schemas.StallUpdate):
    db_stall = db.query(Stall).filter(Stall.stallID == updated_stall.stallID).first()
    if not db_stall:
        return None

    # Update Stall
    updated_stall_data = updated_stall.model_dump(exclude_unset=True)
    for key, value in updated_stall_data.items():
        setattr(db_stall, key, value)

    db.add(db_stall)
    db.commit()
    db.refresh(db_stall)

    if db_stall.hawker and isinstance(db_stall.hawker.geometry, dict):
        db_stall.hawker.geometry = json.dumps(db_stall.hawker.geometry)

    return db_stall


def delete_stall(db: Session, stallID: int) -> bool:
    db_stall = db.query(Stall).filter(Stall.stallID == stallID).first()

    if not db_stall:
        raise HTTPException(status_code=400, detail="Invalid stallID")

    if db_stall.hawker and isinstance(db_stall.hawker.geometry, dict):
        db_stall.hawker.geometry = json.dumps(db_stall.hawker.geometry)

    db.delete(db_stall)
    db.commit()

    return True
