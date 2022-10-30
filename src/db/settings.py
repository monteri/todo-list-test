import os

from sqlalchemy import create_engine


class Database:
    def __init__(self):
        user = os.getenv('DB_USER')
        password = os.getenv('DB_PASSWORD')
        name = os.getenv('DB_NAME')
        host = os.getenv('DB_HOST')
        port = os.getenv('DB_PORT')
        self.engine = create_engine(f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{name}')
        print('Connected to database')


db = Database()
