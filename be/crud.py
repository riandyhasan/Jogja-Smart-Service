from sqlalchemy.orm import Session
import models, schemas

def get_all_places(db: Session):
  return db.query(models.Place).all()

def get_place(db: Session, place_id: int):
  return db.query(models.Place).filter(models.Place.id == place_id).first()

def get_place_by_name(db: Session, name: str):
  return db.query(models.Place).filter(models.Place.name == name).first()

def get_place_by_keyword(db: Session, keyword: str):
  return db.query(models.Place).filter(models.Place.name.like(f'%{keyword}%')).all()

def get_parking_by_type(db: Session, place_id: int, type: str):
  return db.query(models.Parking).filter(models.Parking.place_id == place_id and models.Parking.type == type).first()

def get_all_parkings(db: Session):
  return db.query(models.Place).all()

def update_used_parking(db: Session, parking: schemas.Parking):
  curr = get_parking_by_type(db=db, place_id=parking.place_id, type=parking.type)
  curr.used = parking.used
  db.add(curr)
  db.commit()
  db.refresh(curr)
  return curr

def create_place(db: Session, place: schemas.CreatePlace):
  db_place = models.Place(name=place.name, address=place.address, latitude=place.latitude, longitude=place.longitude, image=place.image)
  db.add(db_place)
  db.commit()
  db.refresh(db_place)
  return db_place


def create_parking(db: Session, parking: schemas.CreateParking):
  db_parking = models.Parking(place_id=parking.place_id, type=parking.type, capacity=parking.capacity, used=parking.used)
  db.add(db_parking)
  db.commit()
  db.refresh(db_parking)
  return db_parking