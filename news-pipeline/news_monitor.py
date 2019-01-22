import datetime
import hashlib
import redis
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import news_api_client 
from cloudAMQP_client import CloudAMQPClient

REDIS_HOST = 'localhost'
REDIS_PORT = 6379
SCRAPE_NEWS_TASK_QUEUE_URL = 'amqp://ifnbkfix:ib9jYqRnjRDtxUh3enEzfeFr4UDi4OC7@shark.rmq.cloudamqp.com/ifnbkfix'
SCRAPE_NEWS_TASK_QUEUE_NAME = 'tap-news-scrape-news-task-queue'
SLEEP_TIME_IN_SECONDS = 30 # 90
NEWS_TIME_OUT_IN_SECONDS = 3600 * 24

NEWS_SOURCES = [
    'bbc-news',
    'bbc-sport',
    'bloomberg',
    'cnn',
    'entertainment-weekly',
    'espn',
    'ign',
    'techcrunch',
    'the-new-york-times',
    'the-wall-street-journal',
    'the-washington-post'
]
EVERYTHING_API = 'everything'
SORT_BY_TOP = 'publishedAt'
PAGE_SIZE = 100

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT)
cloudAMQP_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)

while True:
    news_list = news_api_client.getNewsFromSource(sources=NEWS_SOURCES, api_name=EVERYTHING_API,
    sort_by=SORT_BY_TOP, pageSize=PAGE_SIZE)

    num_of_new_news = 0

    for news in news_list:
        news_digest = hashlib.md5(news['title'].encode('utf-8')).digest().encode('base64')

        if redis_client.get(news_digest) is None:
            num_of_new_news += 1
            news['digest'] = news_digest

            if news['publishedAt'] is None:
                news['publishedAt'] = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

            redis_client.set(news_digest, "True")
            redis_client.expire(news_digest, NEWS_TIME_OUT_IN_SECONDS)

            cloudAMQP_client.send_message(news)

    print("Fetched {} news.".format(num_of_new_news))
    cloudAMQP_client.sleep(SLEEP_TIME_IN_SECONDS)