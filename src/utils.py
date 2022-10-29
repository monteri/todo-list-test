import json


class Request:
    def __init__(self, environ):
        self.path = environ.get('PATH_INFO')
        self.query = environ.get('QUERY_STRING')
        self.method = environ.get('REQUEST_METHOD')
        self.body = None
        if self.method == 'POST':
            body = environ.get('wsgi.input').read()
            if body:
                self.body = json.loads(body)


def api_endpoint(handler):
    def wrapper(*args, **kwargs):
        status, content = handler(*args, **kwargs)
        response = json.dumps(content)
        return (status, [
            ("Content-Type", "application/json"),
            ("Content-Length", str(len(response))),
            ('Access-Control-Allow-Origin', '*'),
        ], response)

    return wrapper
