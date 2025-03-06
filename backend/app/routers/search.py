from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
import schemas.search as search_schemas
from controllers.search import SearchController


router = APIRouter()

tags_metadata = [
    {
        "name": "Search",
        "description": "API Endpoints for methods implemented by the Search",
    }
]


@router.get(
    "/search/{query}", response_model=search_schemas.SearchResponse, tags=["Search"]
)
def get_all_matching_name(query: str, db: Session = Depends(get_db)):
    return SearchController.getSearchResult(db, query)
