from dotenv import load_dotenv
load_dotenv()

from src.dispatcher import get_handler
from src.utils import Request


def app(environ, start_response):
    if environ['REQUEST_METHOD'] == 'OPTIONS':
        start_response(
            '200 OK',
            [
                ('Content-Type', 'application/json'),
                ('Access-Control-Allow-Origin', '*'),
                ('Access-Control-Allow-Headers', 'Authorization, Content-Type'),
                ('Access-Control-Allow-Methods', 'POST'),
            ]
        )
        return ''

    request = Request(environ)
    handler = get_handler(request.path)
    status, headers, data = handler(request)
    data = data.encode("utf-8")
    start_response(status, headers)
    return iter([data])


if __name__ == '__main__':
    from waitress import serve
    print('Server is running')
    serve(app, host='0.0.0.0', port=5000)
