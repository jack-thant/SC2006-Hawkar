from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from controllers.stall import StallController
import schemas.stall as stall_schemas
import schemas.dish as dish_schemas
from schemas.response import StandardResponse

router = APIRouter()

tags_metadata = [
    {
        "name": "Stall Controller",
        "description": "API Endpoints for methods implemented by the Stall Controller",
    },
    {"name": "Stall (CRUD)", "description": "API CRUD Endpoints for Stall Model"},
]

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #


@router.post(
    "/stall-controller/add-dish",
    response_model=dish_schemas.Dish,
    tags=["Stall Controller"],
)
def add_dish(dish: dish_schemas.DishCreate, db: Session = Depends(get_db)):
    return StallController.addDish(db, dish)


@router.put(
    "/stall-controller/edit-dish",
    response_model=dish_schemas.Dish,
    tags=["Stall Controller"],
)
def edit_dish(dish: dish_schemas.DishUpdate, db: Session = Depends(get_db)):
    return StallController.editDish(db, dish)


@router.delete("/stall-controller/delete-dish/{dish_id}", tags=["Stall Controller"])
def delete_dish(dish_id: int, db: Session = Depends(get_db)):
    result = StallController.deleteDish(db, dish_id)
    if not result:
        raise HTTPException(status_code=404, detail="Dish not found")
    return {"detail": "Dish deleted successfully"}


# ------------------------------------------------------------ #
# -------------------- Stall (CRUD) ------------------------- #
# ------------------------------------------------------------ #


@router.get("/stalls", response_model=list[stall_schemas.Stall], tags=["Stall (CRUD)"])
def get_all_stalls(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return StallController.getAllStalls(db, skip, limit)


@router.get(
    "/stall/{stall_id}", response_model=stall_schemas.Stall, tags=["Stall (CRUD)"]
)
async def get_stall_by_stall_id(stall_id: str, db: Session = Depends(get_db)):
    return StallController.getStallByStallId(db, stall_id)


@router.get(
    "/stall/hawkerid/{hawker_id}",
    response_model=list[stall_schemas.Stall],
    tags=["Stall (CRUD)"],
)
async def get_stall_by_hawker_id(hawker_id: str, db: Session = Depends(get_db)):
    return StallController.getStallByHawkerId(db, hawker_id)


@router.post(
    "/stall/add",
    response_model=StandardResponse,
    tags=["Stall (CRUD)"],
)
def add_stall(stall: stall_schemas.StallCreate, db: Session = Depends(get_db)):
    StallController.addStall(db, stall)
    return StandardResponse(success=True, message="Stall created successfully")


@router.put(
    "/stall/update/{stall_id}",
    response_model=StandardResponse,
    tags=["Stall (CRUD)"],
)
def update_stall(
    stall_id: int, stall: stall_schemas.StallUpdate, db: Session = Depends(get_db)
):
    StallController.updateStall(db, stall, stall_id)
    return StandardResponse(success=True, message="Stall updated successfully")


@router.delete(
    "/stall/delete/{stall_id}", response_model=StandardResponse, tags=["Stall (CRUD)"]
)
def delete_stall(stall_id: int, db: Session = Depends(get_db)):
    result = StallController.deleteStall(db, stall_id)
    if not result:
        raise HTTPException(status_code=404, detail="Stall not found")
    return StandardResponse(success=True, message="Stall deleted successfully")
