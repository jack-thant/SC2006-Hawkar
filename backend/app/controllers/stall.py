from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.stall as stall_services
import services.dish as dish_services

import schemas.stall as stall_schemas
import schemas.dish as dish_schemas


class StallController:
    # -------------------------------------------------------- #
    # -------------------- Business Logic -------------------- #
    # -------------------------------------------------------- #

    def addDish(db: Session, dish: dish_schemas.DishCreate):
        db_dish = dish_services.create_dish(db, dish)
        return db_dish

    def editDish(db: Session, updated_dish: dish_schemas.DishUpdate):
        db_dish = dish_services.update_dish(db, updated_dish)
        return db_dish

    def deleteDish(db: Session, dishID: int):
        return dish_services.delete_dish(db, dishID)

    # ------------------------------------------------------------ #
    # -------------------- Stall (CRUD) ----------------------- #
    # ------------------------------------------------------------ #
    # ----- Stall ----- #
    def getStallByHawkerId(db: Session, hawkerID: int):
        stall = stall_services.get_stalls_by_hawker_id(db, hawkerID=hawkerID)
        if stall is None:
            raise HTTPException(status_code=404, detail="Stall not found")
        return stall

    def getStallByStallId(db: Session, stallID: int):
        stall = stall_services.get_stall_by_stall_id(db, stallID=stallID)
        if stall is None:
            raise HTTPException(status_code=404, detail="Stall not found")
        return stall

    def getAllStalls(db: Session, skip: int, limit: int):
        stalls = stall_services.get_all_stalls(db, skip=skip, limit=limit)
        return stalls

    def updateStall(db: Session, updated_stall: stall_schemas.StallUpdate):
        stall = stall_services.update_stall(db, updated_stall)
        if stall is None:
            raise HTTPException(status_code=404, detail="Stall not found")
        return stall
