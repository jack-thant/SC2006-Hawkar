from sqlalchemy.orm import Session
from fastapi import HTTPException
import json

import schemas.stall as stall_schemas
from models.stall import Stall
from models.hawker import Hawker
from models.hawkerCenter import HawkerCenter
from services.objectStorage import ObjectStorage


def convert_str_to_list(images_string):
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


def convert_list_to_str(images_list):
    """
    Convert list of image URLs to comma-separated string.

    Args:
        images_list: List of image URL strings or None

    Returns:
        Comma-separated string of image URLs
    """
    if images_list and isinstance(images_list, list):
        string_values = [
            str(item.value) if hasattr(item, "value") else str(item)
            for item in images_list
        ]
        return ", ".join(string_values)
    return images_list


def get_stall_by_stall_id(db: Session, stallID: int):
    db_stall = db.query(Stall).filter(Stall.stallID == stallID).first()

    if not db_stall:
        raise HTTPException(status_code=404, detail="Stall not found")

    # Convert images from string to list
    db_stall.images = convert_str_to_list(db_stall.images)
    db_stall.cuisineType = convert_str_to_list(db_stall.cuisineType)
    return db_stall


def get_stalls_by_hawker_id(db: Session, hawkerID: int):
    db_stalls = db.query(Stall).filter(Stall.hawkerID == hawkerID)

    if not db_stalls:
        raise HTTPException(status_code=400, detail="Invalid hawkerID")

    # Convert images from string to list for each stall
    for stall in db_stalls:
        stall.images = convert_str_to_list(stall.images)
        stall.cuisineType = convert_str_to_list(stall.cuisineType)
    return db_stalls


def get_all_stalls(db: Session, skip: int = 0, limit: int = 100):
    db_stalls = db.query(Stall).offset(skip).limit(limit).all()

    # Convert images from string to list for each stall
    for stall in db_stalls:
        stall.images = convert_str_to_list(stall.images)
        stall.cuisineType = convert_str_to_list(stall.cuisineType)
    return db_stalls


def get_all_hawker_centers(db: Session, skip: int = 0, limit: int = 100):
    db_hawker_centers = db.query(HawkerCenter).offset(skip).limit(limit).all()

    return db_hawker_centers


def create_stall(db: Session, stall: stall_schemas.StallCreate):
    db_hawker = db.query(Hawker).filter(Hawker.hawkerID == stall.hawkerID).first()
    if not db_hawker:
        raise HTTPException(status_code=400, detail="Invalid hawkerID")

    # Convert images from list to string before storing
    # images_string = convert_list_to_str(stall.images)
    images_string = "TEMPORARY"
    cuisine_string = convert_list_to_str(stall.cuisineType)

    db_stall = Stall(
        stallName=stall.stallName,
        hawkerID=stall.hawkerID,
        hawkerCenterID=stall.hawkerCenterID,
        images=images_string,
        unitNumber=stall.unitNumber,
        startTime=stall.startTime,
        endTime=stall.endTime,
        hygieneRating=stall.hygieneRating,
        cuisineType=cuisine_string,
        estimatedWaitTime=stall.estimatedWaitTime,
        priceRange=stall.priceRange,
    )

    db.add(db_stall)
    db.commit()
    db.refresh(db_stall)

    images_url = []
    if stall.images:
        storage = ObjectStorage()
        for image in stall.images:
            image_url = storage.upload_stall_image(db_stall.stallID, image)
            images_url.append(image_url)

        db_stall.images = images_url

    db_stall.images = convert_list_to_str(db_stall.images)

    db.add(db_stall)
    db.commit()
    db.refresh(db_stall)

    # Convert back to list for API response
    db_stall.images = convert_str_to_list(db_stall.images)
    db_stall.cuisineType = convert_str_to_list(db_stall.cuisineType)
    return db_stall


def update_stall(db: Session, updated_stall: stall_schemas.StallUpdate, stall_id: int):
    db_stall = db.query(Stall).filter(Stall.stallID == stall_id).first()
    if not db_stall:
        return None

    # Update Stall
    updated_stall_data = updated_stall.model_dump(exclude_unset=True)

    images_url = []

    # Convert images from list to string if present
    if "images" in updated_stall_data and isinstance(
        updated_stall_data["images"], list
    ):
        storage = ObjectStorage()
        for image in updated_stall_data["images"]:
            if image.startswith("http"):
                images_url.append(image)
                continue
            image_url = storage.upload_stall_image(stall_id, image)
            images_url.append(image_url)
        updated_stall_data["images"] = images_url

        updated_stall_data["images"] = convert_list_to_str(updated_stall_data["images"])

    # Convert cuisineType from list to string if present
    if "cuisineType" in updated_stall_data and isinstance(
        updated_stall_data["cuisineType"], list
    ):
        updated_stall_data["cuisineType"] = convert_list_to_str(
            updated_stall_data["cuisineType"]
        )

    for key, value in updated_stall_data.items():
        setattr(db_stall, key, value)

    db.add(db_stall)
    db.commit()
    db.refresh(db_stall)

    # Convert back to list for API response
    db_stall.images = convert_str_to_list(db_stall.images)
    db_stall.cuisineType = convert_str_to_list(db_stall.cuisineType)
    return db_stall


def delete_stall(db: Session, stallID: int) -> bool:
    db_stall = db.query(Stall).filter(Stall.stallID == stallID).first()

    if not db_stall:
        raise HTTPException(status_code=400, detail="Invalid stallID")

    db.delete(db_stall)
    db.commit()

    return True
