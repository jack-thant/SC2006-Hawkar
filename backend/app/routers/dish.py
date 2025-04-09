from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from controllers.dish import DishController
import schemas.dish as dish_schemas
import schemas.promotion as promotion_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Dish Controller",
        "description": "API Endpoints for methods implemented by the Dish Controller",
    },
    {"name": "Dish (CRUD)", "description": "API CRUD Endpoints for Dish Model"},
]

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #


@router.post(
    "/dish-controller/add-promotion",
    response_model=promotion_schemas.Promotion,
    tags=["Dish Controller"],
)
def add_promotion(
    promotion: promotion_schemas.PromotionCreate, db: Session = Depends(get_db)
):
    return DishController.addPromotion(db, promotion)


@router.put(
    "/dish-controller/edit-promotion",
    response_model=promotion_schemas.Promotion,
    tags=["Dish Controller"],
)
def edit_promotion(
    promotion: promotion_schemas.PromotionUpdate, db: Session = Depends(get_db)
):
    return DishController.editPromotion(db, promotion)


@router.delete(
    "/dish-controller/delete-promotion/{promotion_id}", tags=["Dish Controller"]
)
def delete_promotion(promotion_id: int, db: Session = Depends(get_db)):
    result = DishController.deletePromotion(db, promotion_id)
    if not result:
        raise HTTPException(status_code=404, detail="Promotion not found")
    return {"detail": "Promotion deleted successfully"}


# ------------------------------------------------------------ #
# -------------------- Dish (CRUD) ------------------------- #
# ------------------------------------------------------------ #


@router.get("/dishes", response_model=list[dish_schemas.Dish], tags=["Dish (CRUD)"])
def get_all_dishes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return DishController.getAllDishes(db, skip, limit)


@router.get("/dish/{dish_id}", response_model=dish_schemas.Dish, tags=["Dish (CRUD)"])
async def get_dish_by_dish_id(dish_id: str, db: Session = Depends(get_db)):
    return DishController.getDishByDishId(db, dish_id)


# @router.get(
#     "/dish/stallid/{stall_id}",
#     response_model=list[dish_schemas.Dish],
#     tags=["Dish (CRUD)"],
# )
# async def get_dish_by_stall_id(stall_id: str, db: Session = Depends(get_db)):
#     return DishController.getDishesByStallId(db, stall_id)


@router.put("/dish/update", response_model=dish_schemas.Dish, tags=["Dish (CRUD)"])
def update_dish(dish: dish_schemas.DishUpdate, db: Session = Depends(get_db)):
    return DishController.updateDish(db, dish)
