from sqlalchemy.orm import Session
from fastapi import HTTPException
import json

import schemas.stall as stall_schemas
from models.stall import Stall
from models.hawker import Hawker


def convert_images_to_list(images_string):
    """
    Convert comma-separated image URLs to a list.

    Args:
        images_string: String of comma-separated image URLs or None

    Returns:
        List of image URL strings
    """
    if images_string and isinstance(images_string, str):
        return [url.strip() for url in images_string.split(",") if url.strip()]
    return [] if images_string is None else images_string


def convert_images_to_string(images_list):
    """
    Convert list of image URLs to comma-separated string.

    Args:
        images_list: List of image URL strings or None

    Returns:
        Comma-separated string of image URLs
    """
    if images_list and isinstance(images_list, list):
        return ", ".join(images_list)
    return images_list


def get_stall_by_stall_id(db: Session, stallID: int):
    db_stall = db.query(Stall).filter(Stall.stallID == stallID).first()

    if not db_stall:
        raise HTTPException(status_code=404, detail="Stall not found")

    # Convert images from string to list
    db_stall.images = convert_images_to_list(db_stall.images)
    return db_stall


def get_stalls_by_hawker_id(db: Session, hawkerID: int):
    db_stalls = db.query(Stall).filter(Stall.hawkerID == hawkerID)

    if not db_stalls:
        raise HTTPException(status_code=400, detail="Invalid hawkerID")

    # Convert images from string to list for each stall
    for stall in db_stalls:
        stall.images = convert_images_to_list(stall.images)
    return db_stalls


def get_all_stalls(db: Session, skip: int = 0, limit: int = 100):
    db_stalls = db.query(Stall).offset(skip).limit(limit).all()

    # Convert images from string to list for each stall
    for stall in db_stalls:
        stall.images = convert_images_to_list(stall.images)
    return db_stalls


def create_stall(db: Session, stall: stall_schemas.StallCreate):
    db_hawker = db.query(Hawker).filter(Hawker.hawkerID == stall.hawkerID).first()
    if not db_hawker:
        raise HTTPException(status_code=400, detail="Invalid hawkerID")

    # Convert images from list to string before storing
    images_string = convert_images_to_string(stall.images)

    db_stall = Stall(
        stallName=stall.stallName,
        hawkerID=stall.hawkerID,
        hawekrCenterID=stall.hawkerCenterID,
        images=images_string,
        unitNumber=stall.unitNumber,
        startTime=stall.startTime,
        endTime=stall.endTime,
        hygieneRating=stall.hygieneRating,
        cuisineType=stall.cuisineType,
        estimatedWaitTime=stall.estimatedWaitTime,
        priceRange=stall.priceRange,
    )

    db.add(db_stall)
    db.commit()
    db.refresh(db_stall)

    # Convert back to list for API response
    db_stall.images = convert_images_to_list(db_stall.images)
    return db_stall


def update_stall(db: Session, updated_stall: stall_schemas.StallUpdate):
    db_stall = db.query(Stall).filter(Stall.stallID == updated_stall.stallID).first()
    if not db_stall:
        return None

    # Update Stall
    updated_stall_data = updated_stall.model_dump(exclude_unset=True)

    # Convert images from list to string if present
    if "images" in updated_stall_data and isinstance(
        updated_stall_data["images"], list
    ):
        updated_stall_data["images"] = convert_images_to_string(
            updated_stall_data["images"]
        )

    for key, value in updated_stall_data.items():
        setattr(db_stall, key, value)

    db.add(db_stall)
    db.commit()
    db.refresh(db_stall)

    # Convert back to list for API response
    db_stall.images = convert_images_to_list(db_stall.images)
    return db_stall


def delete_stall(db: Session, stallID: int) -> bool:
    db_stall = db.query(Stall).filter(Stall.stallID == stallID).first()

    if not db_stall:
        raise HTTPException(status_code=400, detail="Invalid stallID")

    db.delete(db_stall)
    db.commit()

    return True
