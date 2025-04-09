from fastapi import HTTPException
from sqlalchemy.orm import Session
import json

import services.hawker as hawker_services
import services.stall as stall_services


import schemas.hawker as hawker_schemas
import schemas.stall as stall_schemas


class HawkerController:

    # ------------------------------------------------------------ #
    # -------------------- Hawker (CRUD) ------------------------- #
    # ------------------------------------------------------------ #
    def addHawker(db: Session, hawker: hawker_schemas.HawkerCreate):
        db_hawker = hawker_services.create_hawker(db, hawker)
        return db_hawker

    def getHawkerByUserId(db: Session, userID: int):
        hawker = hawker_services.get_hawker_by_user_id(db, userID=userID)
        if hawker is None:
            raise HTTPException(status_code=404, detail="Hawker not found")

        return hawker

    def getHawkerByHawkerId(db: Session, hawkerID: int):
        hawker = hawker_services.get_hawker_by_hawker_id(db, hawkerID=hawkerID)
        if hawker is None:
            raise HTTPException(status_code=404, detail="Hawker not found")

        return hawker

    def getAllHawkers(db: Session, skip: int, limit: int):
        hawkers = hawker_services.get_all_hawkers(db, skip=skip, limit=limit)

        return hawkers

    def updateHawker(db: Session, updated_hawker: hawker_schemas.HawkerUpdate):
        hawker = hawker_services.update_hawker(db, updated_hawker)
        if hawker is None:
            raise HTTPException(status_code=404, detail="Hawker not found")

        # # convert geometry json to dict
        # hawker.geometry = json.loads(hawker.geometry)

        return hawker

    def deleteHawker(db: Session, hawkerID: int):
        return hawker_services.delete_hawker(db, hawkerID)
