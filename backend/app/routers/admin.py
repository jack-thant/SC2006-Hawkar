from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.admin import AdminController

import schemas.admin as admin_schemas
import schemas.hawker as hawker_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Admin Controller",
        "description": "API Endpoints for methods implemented by the Admin Controller",
    },
    {"name": "Admin (CRUD)", "description": "API CRUD Endpoints for Admin Model"},
]

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #


@router.post(
    "/admin-controller/verify-hawker/{hawkerID}",
    response_model=hawker_schemas.HawkerUpdate,
    tags=["Admin Controller"],
)
async def verify_hawker(hawkerID: int, db: Session = Depends(get_db)):
    return AdminController.verifyHawker(db, hawkerID)


# ------------------------------------------------------------ #
# -------------------- Admin (CRUD) -------------------------- #
# ------------------------------------------------------------ #
@router.get("/admins", response_model=list[admin_schemas.Admin], tags=["Admin (CRUD)"])
def get_all_admins(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return AdminController.getAllAdmins(db, skip, limit)


@router.get(
    "/admin/{admin_id}", response_model=admin_schemas.Admin, tags=["Admin (CRUD)"]
)
async def get_admin_by_admin_id(admin_id: str, db: Session = Depends(get_db)):
    return AdminController.getAdminByAdminId(db, admin_id)


@router.get(
    "/admin/userid/{user_id}", response_model=admin_schemas.Admin, tags=["Admin (CRUD)"]
)
async def get_admin_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return AdminController.getAdminByUserId(db, user_id)


@router.put("/admin/update", response_model=admin_schemas.Admin, tags=["Admin (CRUD)"])
def update_admin(admin: admin_schemas.AdminUpdate, db: Session = Depends(get_db)):
    return AdminController.updateAdmin(db, admin)
