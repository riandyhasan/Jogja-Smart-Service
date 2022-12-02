from pydantic import BaseModel
from typing import List

class ParkingBase(BaseModel):
  type: str
  capacity: int
  used: int

class CreateParking(ParkingBase):
  place_id: int

class UpdateParking(BaseModel):
  type: str
  place_id: int
  used: int

class Parking(ParkingBase):
  id: int
  place_id: int

  class Config:
    orm_mode = True

class PlaceBase(BaseModel):
  name: str
  address: str
  latitude: float
  longitude: float
  image: str

class CreatePlace(PlaceBase):
  pass

class Place(PlaceBase):
  id: int
  parkings: List[Parking] = []

  class Config:
    orm_mode = True
