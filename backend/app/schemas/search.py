from pydantic import BaseModel
from schemas.hawker import Hawker
from schemas.dish import Dish


class SearchResponse(BaseModel):
    hawkers: list[Hawker]
    dishes: list[Dish]
