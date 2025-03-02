from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.promotion as promotion_services

import schemas.promotion as promotion_schemas


class PromotionController:
    # ------------------------------------------------------------ #
    # -------------------- Promotion (CRUD) ----------------------- #
    # ------------------------------------------------------------ #
    # ----- Promotion ----- #
    def getPromotionsByDishId(db: Session, dishID: int):
        promotions = promotion_services.get_promotions_by_dish_id(db, dishID=dishID)
        if promotions is None:
            raise HTTPException(status_code=404, detail="Promotion not found")
        return promotions

    def getPromotionByPromotionId(db: Session, promotionID: int):
        promotion = promotion_services.get_promotion_by_promotion_id(
            db, promotionID=promotionID
        )
        if promotion is None:
            raise HTTPException(status_code=404, detail="Promotion not found")
        return promotion

    def getAllPromotions(db: Session, skip: int, limit: int):
        promotions = promotion_services.get_all_promotions(db, skip=skip, limit=limit)
        return promotions

    def updatePromotion(
        db: Session, updated_promotion: promotion_schemas.PromotionUpdate
    ):
        promotion = promotion_services.update_promotion(db, updated_promotion)
        if promotion is None:
            raise HTTPException(status_code=404, detail="Promotion not found")
        return promotion
