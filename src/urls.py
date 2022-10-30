from src.controllers import get_todo_list, update_task,\
    delete_task, not_found, add_task

APP_URLS = [
    ('^/api/todo-list$', get_todo_list),
    ('^/api/tasks/[0-9]+/update$', update_task),
    ('^/api/tasks/[0-9]+/delete$', delete_task),
    ('^/api/tasks$', add_task),
]

FALLBACK_HANDLER = not_found
