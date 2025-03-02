from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from controllers.user import UserController
from controllers.hawker import HawkerController
import schemas.hawker as hawker_schemas
import schemas.stall as stall_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Hawker Controller",
        "description": "API Endpoints for methods implemented by the Hawker Controller",
    },
    {"name": "Hawker (CRUD)", "description": "API CRUD Endpoints for Hawker Model"},
]

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #


@router.post(
    "/hawker-controller/add-stall",
    response_model=stall_schemas.Stall,
    tags=["Hawker Controller"],
)
def add_stall(stall: stall_schemas.StallCreate, db: Session = Depends(get_db)):
    return HawkerController.addStall(db, stall)


@router.put(
    "/hawker-controller/edit-stall",
    response_model=stall_schemas.Stall,
    tags=["Hawker Controller"],
)
def edit_stall(stall: stall_schemas.StallUpdate, db: Session = Depends(get_db)):
    return HawkerController.editStall(db, stall)


@router.delete("/hawker-controller/delete-stall/{stall_id}", tags=["Hawker Controller"])
def delete_stall(stall_id: int, db: Session = Depends(get_db)):
    result = HawkerController.deleteStall(db, stall_id)
    if not result:
        raise HTTPException(status_code=404, detail="Stall not found")
    return {"detail": "Stall deleted successfully"}


# ------------------------------------------------------------ #
# -------------------- Hawker (CRUD) ------------------------- #
# ------------------------------------------------------------ #
@router.get("/hawkers/public", tags=["Hawker (CRUD)"])
async def getAllPublicHawkers():
    hawkersLocation = UserController.getAllPublicHawkers()
    if hawkersLocation is None:
        raise HTTPException(status_code=404, detail="Public Hawkers not found")
    return hawkersLocation


@router.get(
    "/hawkers", response_model=list[hawker_schemas.Hawker], tags=["Hawker (CRUD)"]
)
def get_all_hawkers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return HawkerController.getAllHawkers(db, skip, limit)


@router.get(
    "/hawker/{hawker_id}", response_model=hawker_schemas.Hawker, tags=["Hawker (CRUD)"]
)
async def get_hawker_by_hawker_id(hawker_id: str, db: Session = Depends(get_db)):
    return HawkerController.getHawkerByHawkerId(db, hawker_id)


@router.get(
    "/hawker/userid/{user_id}",
    response_model=hawker_schemas.Hawker,
    tags=["Hawker (CRUD)"],
)
async def get_hawker_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return HawkerController.getHawkerByUserId(db, user_id)


@router.put(
    "/hawker/update", response_model=hawker_schemas.Hawker, tags=["Hawker (CRUD)"]
)
def update_hawker(hawker: hawker_schemas.HawkerUpdate, db: Session = Depends(get_db)):
    return HawkerController.updateHawker(db, hawker)
