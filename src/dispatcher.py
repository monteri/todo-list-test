import re

from src.urls import APP_URLS, FALLBACK_HANDLER


def get_handler(path):
    for url, handler in APP_URLS:
        if re.search(url, path):
            return handler
    return FALLBACK_HANDLER
