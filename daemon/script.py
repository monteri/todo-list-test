import requests
import time

REQUEST_URL = 'http://ec2-100-25-94-75.compute-1.amazonaws.com/api/clear-db'

while True:
    res = requests.get(REQUEST_URL)
    time.sleep(120)
