from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.search as search_services


class SearchController:
    def getSearchResult(db: Session, query: str):
        results = search_services.search_all(db, query)
        return results
