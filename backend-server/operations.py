import json
import os
import pickle
import random
import redis
import sys

from bson.json_util import dumps
from datetime import datetime

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
from cloudAMQP_client import CloudAMQPClient
import mongodb_client


REDIS_HOST = "localhost"
REDIS_PORT = 6379

NEWS_TABLE_NAME = "news-test"
CLICK_LOGS_TABLE_NAME = 'click_logs'

NEWS_LIMIT = 100
NEWS_LIST_BATCH_SIZE = 10
USER_NEWS_TIME_OUT_IN_SECONDS = 60

LOG_CLICKS_TASK_QUEUE_URL = "amqp://avmqwntk:xPWE75yv7T5r9AvOJQyrs2eCMHhxIWD8@hornet.rmq.cloudamqp.com/avmqwntk"
LOG_CLICKS_TASK_QUEUE_NAME = "tap-news-log-clicks-task-queue"

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)
cloudAMQP_client = CloudAMQPClient(
    LOG_CLICKS_TASK_QUEUE_URL, LOG_CLICKS_TASK_QUEUE_NAME)

db = mongodb_client.get_db()

def getNewsSummaryForUser(user_id, page_num):
    page_num = int(page_num)
    begin_index = (page_num - 1) * NEWS_LIST_BATCH_SIZE
    end_index = page_num * NEWS_LIST_BATCH_SIZE

    sliced_news = []

    if redis_client.get(user_id) is not None:
        news_digests = pickle.loads(redis_client.get(user_id))
        # print(begin_index, end_index)
        # print(news_digests)
        sliced_news_digests = news_digests[begin_index:end_index]

        sliced_news = list(db[NEWS_TABLE_NAME].find({'digest': {'$in': sliced_news_digests}}, {'_id': 0}))

    else:
        total_news = list(db[NEWS_TABLE_NAME].find({}, {'_id': 0}).sort([('publishedAt', -1)]).limit(NEWS_LIMIT))
        total_news_digests = map(lambda x: x['digest'], total_news)
        redis_client.set(user_id, pickle.dumps(total_news_digests))
        redis_client.expire(user_id, USER_NEWS_TIME_OUT_IN_SECONDS)
        sliced_news = total_news[begin_index:end_index]

        # for news in total_news:
        #     print(news['publishedAt'])
    
    for news in sliced_news:
        news['publishedAt'] = news['publishedAt'].strftime("%H:%M, %m-%d-%Y")

    # print(sliced_news)
    return json.loads(dumps(sliced_news))

def logNewsClickForUser(user_id, news_id):
    
    message = {'userId': user_id, 'newsId': news_id, 'timestamp': datetime.utcnow()}

    db[CLICK_LOGS_TABLE_NAME].insert(message)

    message = {'userId': user_id, 'newsId': news_id, 'timestamp': str(datetime.utcnow())}
    cloudAMQP_client.send_message(message);
    
