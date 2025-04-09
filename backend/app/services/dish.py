from sqlalchemy.orm import Session
from fastapi import HTTPException

import schemas.dish as dish_schemas
import schemas.promotion as promotion_schemas
from models.dish import Dish
from models.stall import Stall
from models.promotion import Promotion
import services.promotion as promotion_services


def get_dish_by_dish_id(db: Session, dishID: int):
    db_dish = db.query(Dish).filter(Dish.dishID == dishID).first()

    if not db_dish:
        raise HTTPException(status_code=404, detail="Dish not found")

    return db_dish


def get_dishes_by_stall_id(db: Session, stallID: int):
    db_dishes = db.query(Dish).filter(Dish.stallID == stallID)

    if not db_dishes:
        raise HTTPException(status_code=400, detail="Invalid stallID")

    return db_dishes


def get_all_dishes(db: Session, skip: int = 0, limit: int = 100):
    db_dishes = db.query(Dish).offset(skip).limit(limit).all()

    return db_dishes


def create_dish(db: Session, dish: dish_schemas.DishCreate):
    db_stall = db.query(Stall).filter(Stall.stallID == dish.stallID).first()
    if not db_stall:
        raise HTTPException(status_code=400, detail="Invalid stallID")

    db_dish = Dish(
        dishName=dish.dishName,
        price=dish.price,
        stallID=dish.stallID,
        photo=dish.photo,
        onPromotion=dish.onPromotion,
    )

    db.add(db_dish)
    db.commit()
    db.refresh(db_dish)

    if dish.onPromotion:
        promotion_services.create_promotion(
            db,
            promotion_schemas.PromotionCreate(
                dishID=db_dish.dishID,
                startDate=dish.startDate,
                endDate=dish.endDate,
                discountedPrice=dish.discountedPrice,
            ),
        )

    return db_dish


def update_dish(db: Session, updated_dish: dish_schemas.DishUpdate):
    db_dish = db.query(Dish).filter(Dish.dishID == updated_dish.dishID).first()
    if not db_dish:
        return None

    if updated_dish.onPromotion:
        promotion_services.create_promotion(
            db,
            promotion_schemas.PromotionCreate(
                dishID=updated_dish.dishID,
                startDate=updated_dish.startDate,
                endDate=updated_dish.endDate,
                discountedPrice=updated_dish.discountedPrice,
            ),
        )
    else:
        db_promotion = promotion_services.get_promotions_by_dish_id(
            db, updated_dish.dishID
        )
        if db_promotion:
            db.delete(db_promotion)
            db.commit()

    # Update Dish
    updated_dish_data = updated_dish.model_dump(exclude_unset=True)
    for key, value in updated_dish_data.items():
        setattr(db_dish, key, value)

    db.add(db_dish)
    db.commit()
    db.refresh(db_dish)

    return db_dish


def delete_dish(db: Session, dishID: int) -> bool:
    db_dish = db.query(Dish).filter(Dish.dishID == dishID).first()

    if not db_dish:
        raise HTTPException(status_code=400, detail="Invalid dishID")

    db.delete(db_dish)
    db.commit()

    return True
