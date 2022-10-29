from sqlalchemy.ext. declarative import declarative_base
from sqlalchemy import Column, Integer, String

from src.db.settings import db

DeclBase = declarative_base()


class Task(DeclBase):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    name = Column(String)


if __name__ == '__main__':
    DeclBase.metadata.create_all(db.engine)
