""" Mongo Client """

from pymongo import MongoClient

MONGO_DB_HOST = 'localhost'
MONGO_DB_PORT = '27017'
DB_NAME = 'tap-news'

CLIENT = MongoClient('{}:{}'.format(MONGO_DB_HOST, MONGO_DB_PORT))

def get_db(db_name=DB_NAME):
    ''' get db with the name of db_name'''
    return CLIENT[db_name]

def drop_db(db_name=DB_NAME):
    ''' drop db with the name of db_name'''
    CLIENT.drop_database(db_name)