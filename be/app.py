from fastapi import Depends, FastAPI, HTTPException, Request, Response
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine
from typing import List
import geopy.distance

app = FastAPI()

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response

def get_db(request: Request):
    return request.state.db

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/", response_model=str)
def read_root():
    return "Database Connected"

@app.get("/get-all-place", response_model=List[schemas.Place])
def read_places(db: Session = Depends(get_db)):
    places = crud.get_all_places(db)
    return places

@app.get("/get-place/{place_id}", response_model=schemas.Place)
def read_places(place_id: int, db: Session = Depends(get_db)):
    place = crud.get_place(db, place_id)
    if place is None:
      raise HTTPException(status_code=400, detail="Tempat tidak ada di database!")
    return place

@app.get("/search-place/{q}", response_model=List[schemas.Place])
def search_places(q: str, db: Session = Depends(get_db)):
    places = crud.get_place_by_keyword(db, keyword=q)
    return places

@app.get("/get-nearest-place/{place_id}", response_model=List[schemas.Place])
def read_nearest_places(place_id: int, db: Session = Depends(get_db)):
    curr_place = crud.get_place(db, place_id=place_id)
    if curr_place is None:
      raise HTTPException(status_code=400, detail="Tempat tidak ada di database!")
    all_places = crud.get_all_places(db)
    result = []
    coords_1 = (curr_place.latitude, curr_place.longitude)
    for place in all_places:
      if(place.id != curr_place.id):
        coords_2 = (place.latitude, place.longitude)
        distance = geopy.distance.geodesic(coords_1, coords_2).km
        if(distance <= 1):
          result.append(place)
    return result

@app.put("/update-parking-used", response_model=schemas.Parking)
def update_parking_used(parking: schemas.UpdateParking, db: Session = Depends(get_db)):
    db_parking = crud.get_parking_by_type(db, place_id=parking.place_id, type=parking.type)
    if db_parking is None:
      raise HTTPException(status_code=400, detail="Tempat parkir tidak ada di database!")
    if parking.used > db_parking.used:
      raise HTTPException(status_code=400, detail="Overcapacity! Variable used tidak boleh melebihi capacity")
    db_parking.used = parking.used
    return crud.update_used_parking(db, parking=db_parking)

@app.post("/create-place", response_model=schemas.Place)
def create_place(place: schemas.CreatePlace, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_name(db, name=place.name)
    if db_place:
        raise HTTPException(status_code=400, detail="Tempat sudah terdaftar!")
    return crud.create_place(db=db, place=place)

@app.post("/create-parking", response_model=schemas.Parking)
def create_parking(parking: schemas.CreateParking, db: Session = Depends(get_db)):
    if parking.type != 'Motorcycle' and parking.type != 'Car' and parking.type != 'Bus':
      raise HTTPException(status_code=400, detail="Jenis parkir tidak valid! (Seharusnya Motorcycle, Car, atau Bus)")
    db_parking = crud.get_parking_by_type(db, place_id=parking.place_id, type=parking.type)
    if db_parking:
        raise HTTPException(status_code=400, detail="Jenis parkir sudah terdaftar pada tempat tersebut!")
    return crud.create_parking(db=db, parking=parking)
