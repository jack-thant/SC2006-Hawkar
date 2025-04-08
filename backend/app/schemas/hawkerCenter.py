from pydantic import BaseModel


class HawkerCenter(BaseModel):
    hawkerCenterID: int
    name: str
    address: str
    latitude: float
    longitude: float

    class ConfigDict:
        from_attributes = True


class HawkerCenterCreate(BaseModel):
    name: str
    address: str
    latitude: float
    longitude: float


class HawkerCenterUpdate(BaseModel):
    hawkerCenterID: int
    name: str
    address: str
    latitude: float
    longitude: float
