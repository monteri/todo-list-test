from sqlalchemy import select, insert, update, delete

from src.utils import api_endpoint
from src.db.settings import db
from src.db.models import Task


@api_endpoint
def not_found(request):
    content = {
        'status': 'Not found'
    }
    return '404 NOT FOUND', content


@api_endpoint
def get_todo_list(request):
    if request.method != 'GET':
        return '400 BAD REQUEST', {}

    content = []
    with db.engine.begin() as connection:
        statement = select(Task)
        tasks = connection.execute(statement)
        for task in tasks.all():
            content.append({
                'id': task.id,
                'name': task.name,
            })

    return '200 OK', content


@api_endpoint
def add_task(request):
    if request.method != 'POST':
        return '400 BAD REQUEST', None

    with db.engine.begin() as connection:
        statement = insert(Task).values(name=request.body['name'])
        connection.execute(statement)
    return '201 OK', {}


@api_endpoint
def update_task(request):
    if request.method != 'POST':
        return '400 BAD REQUEST', None

    id = request.path.split('/')[-2]
    with db.engine.begin() as connection:
        statement = update(Task)\
            .where(Task.id == id)\
            .values(name=request.body['name'])
        connection.execute(statement)
    return '200 OK', {}


@api_endpoint
def delete_task(request):
    if request.method != 'POST':
        return '400 BAD REQUEST', None

    id = request.path.split('/')[-2]
    with db.engine.begin() as connection:
        statement = delete(Task).where(Task.id == id)
        connection.execute(statement)
    return '200 OK', {}
