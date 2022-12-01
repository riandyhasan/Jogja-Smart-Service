from sqlalchemy import Float, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from database import Base


class Place(Base):
  __tablename__ = "place"

  id = Column(Integer, primary_key=True)
  name = Column(String)
  address = Column(String)
  latitude = Column(Float)
  longitude = Column(Float)
  image = Column(String)

  parkings = relationship("Parking", back_populates="base")

class Parking(Base):
  __tablename__ = "parking"

  id = Column(Integer, primary_key=True)
  place_id = Column(Integer, ForeignKey("place.id"))
  type = Column(String)
  capacity = Column(Integer)
  used = Column(Integer)

  base = relationship("Place", back_populates="parkings")
