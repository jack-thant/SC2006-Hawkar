from sqlalchemy.orm import Session

from models.hawker import Hawker
from models.dish import Dish

from search.hawker_dish_trie import hawker_dish_search, initialize_search_index


def setup_search_index(db: Session):
    # Fetch data from database
    hawkers = db.query(Hawker).all()
    dishes = db.query(Dish).all()

    # Convert to dictionary format expected by the search index
    hawker_data = [
        {"hawkerID": h.hawkerID, "businessName": h.businessName} for h in hawkers
    ]
    dish_data = [{"dishID": d.dishID, "dishName": d.dishName} for d in dishes]

    # Initialize the search index
    initialize_search_index(hawker_data, dish_data)


def find_hawkers(db: Session, prefix: str):
    matching_hawkers = hawker_dish_search.search_hawkers(prefix)

    hawker_ids = [hawker_dish_search.get_hawker_id(name) for name in matching_hawkers]

    hawker_objects = db.query(Hawker).filter(Hawker.hawkerID.in_(hawker_ids)).all()

    return hawker_objects


def find_dishes(db: Session, prefix: str):
    matching_dishes = hawker_dish_search.search_dishes(prefix)

    dish_ids = [hawker_dish_search.get_dish_id(name) for name in matching_dishes]

    dish_objects = db.query(Dish).filter(Dish.dishID.in_(dish_ids)).all()

    return dish_objects


def search_all(db: Session, query: str):
    results = hawker_dish_search.search_all(query)

    # Process hawker results
    hawker_ids = [hawker_dish_search.get_hawker_id(name) for name in results["hawkers"]]
    hawkers = db.query(Hawker).filter(Hawker.hawkerID.in_(hawker_ids)).all()

    # Process dish results
    dish_ids = [hawker_dish_search.get_dish_id(name) for name in results["dishes"]]
    dishes = db.query(Dish).filter(Dish.dishID.in_(dish_ids)).all()

    return {"hawkers": hawkers, "dishes": dishes}
