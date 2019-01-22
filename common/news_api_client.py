'''
send requests to NewsAPI
abd obtain popular news
'''

from json import loads
import requests

# get config

NEWS_API_ENDPOINT = 'https://newsapi.org/v2/'
NEWS_API_KEY = '2b0f4ee93b484bc0b11e1499323863ed'
EVERYTHING_API = 'everything'
SORT_BY_TOP = 'publishedAt'
PAGE_SIZE = 100

BBC_NEWS = 'bbc-news'
CNN = 'cnn'
  
DEFAULT_SOURCES = [BBC_NEWS, CNN]


def build_url(end_point=NEWS_API_ENDPOINT, api_name=EVERYTHING_API):
    '''
    get url
    '''
    return end_point + api_name

def getNewsFromSource(sources=DEFAULT_SOURCES, api_name=EVERYTHING_API, sort_by=SORT_BY_TOP, pageSize=PAGE_SIZE):
    articles = []

    for source in sources:
        payload = {'apiKey':NEWS_API_KEY,
                   'sources':source,
                   'sortBy':sort_by,
                   'pageSize':pageSize}

        response = requests.get(build_url(api_name=api_name), params=payload)

        # print response.content
        res_json = loads(response.content)

        # Extract info from response
        if (res_json is not None and 
            res_json['status'] == 'ok'):
            articles.extend(res_json['articles'])

    return articles