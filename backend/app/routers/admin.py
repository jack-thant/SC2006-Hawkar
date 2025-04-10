from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.admin import AdminController

import schemas.admin as admin_schemas
import schemas.hawker as hawker_schemas
import schemas.review as review_schemas
from schemas.response import StandardResponse

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


@router.put(
    "/admin/verify-hawker/{hawkerID}",
    response_model=StandardResponse,
    tags=["Admin-Hawker"],
)
async def verify_hawker(hawkerID: int, db: Session = Depends(get_db)):
    AdminController.verifyHawker(db, hawkerID)
    return StandardResponse(
        success=True,
        message="Hawker approved successfully")


@router.get(
    "/admin/reported_reviews",
    response_model=list[review_schemas.Review],
    tags=["Admin-Review"],
)
def get_all_reported_reviews(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    return AdminController.getAllReportedReviews(db, skip, limit)


@router.put(
    "/admin/reports/{reviewID}/ignore",
    response_model=StandardResponse,
    tags=["Admin-Review"],
)
def ignore_reported_review(reviewID: int, db: Session = Depends(get_db)):
    AdminController.ignoreReportedReview(db, reviewID)
    return StandardResponse(
        success=True,
        message="Report marked as resolved",
    )


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
