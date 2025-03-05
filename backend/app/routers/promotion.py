from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from controllers.promotion import PromotionController
import schemas.promotion as promotion_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Promotion Controller",
        "description": "API Endpoints for methods implemented by the Promotion Controller",
    },
    {
        "name": "Promotion (CRUD)",
        "description": "API CRUD Endpoints for Promotion Model",
    },
]


# ------------------------------------------------------------ #
# -------------------- Promotion (CRUD) ------------------------- #
# ------------------------------------------------------------ #


@router.get(
    "/promotions",
    response_model=list[promotion_schemas.Promotion],
    tags=["Promotion (CRUD)"],
)
def get_all_promotions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return PromotionController.getAllPromotions(db, skip, limit)


@router.get(
    "/promotion/{promotion_id}",
    response_model=promotion_schemas.Promotion,
    tags=["Promotion (CRUD)"],
)
async def get_promotion_by_promotion_id(
    promotion_id: str, db: Session = Depends(get_db)
):
    return PromotionController.getPromotionByPromotionId(db, promotion_id)


@router.get(
    "/promotion/dishid/{dish_id}",
    response_model=promotion_schemas.Promotion,
    tags=["Promotion (CRUD)"],
)
async def get_promotions_by_dish_id(dish_id: int, db: Session = Depends(get_db)):
    return PromotionController.getPromotionsByDishId(db, dish_id)


@router.put(
    "/promotion/update",
    response_model=promotion_schemas.Promotion,
    tags=["Promotion (CRUD)"],
)
def update_promotion(
    promotion: promotion_schemas.PromotionUpdate, db: Session = Depends(get_db)
):
    return PromotionController.updatePromotion(db, promotion)
