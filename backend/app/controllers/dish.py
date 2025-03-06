from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.dish as dish_services
import services.promotion as promotion_services

import schemas.dish as dish_schemas
import schemas.promotion as promotion_schemas


class DishController:
    # -------------------------------------------------------- #
    # -------------------- Business Logic -------------------- #
    # -------------------------------------------------------- #

    def addPromotion(db: Session, promotion: promotion_schemas.PromotionCreate):
        existedPromotion = promotion_services.get_promotions_by_dish_id(
            db, promotion.dishID
        )

        if existedPromotion:  # Changed to check if the list has any items
            raise HTTPException(status_code=400, detail="Promotion already exists")
        db_promotion = promotion_services.create_promotion(db, promotion)
        return db_promotion

    def editPromotion(
        db: Session, updated_promotion: promotion_schemas.PromotionUpdate
    ):
        db_promotion = promotion_services.update_promotion(db, updated_promotion)
        return db_promotion

    def deletePromotion(db: Session, promotionID: int):
        return promotion_services.delete_promotion(db, promotionID)

    # ------------------------------------------------------------ #
    # -------------------- Dish (CRUD) ----------------------- #
    # ------------------------------------------------------------ #
    # ----- Dish ----- #
    def getDishesByStallId(db: Session, stallID: int):
        dishes = dish_services.get_dishes_by_stall_id(db, stallID=stallID)
        if dishes is None:
            raise HTTPException(status_code=404, detail="Dish not found")
        return dishes

    def getDishByDishId(db: Session, dishID: int):
        dish = dish_services.get_dish_by_dish_id(db, dishID=dishID)
        if dish is None:
            raise HTTPException(status_code=404, detail="Dish not found")
        return dish

    def getAllDishes(db: Session, skip: int, limit: int):
        dishs = dish_services.get_all_dishes(db, skip=skip, limit=limit)
        return dishs

    def updateDish(db: Session, updated_dish: dish_schemas.DishUpdate):
        dish = dish_services.update_dish(db, updated_dish)
        if dish is None:
            raise HTTPException(status_code=404, detail="Dish not found")
        return dish
