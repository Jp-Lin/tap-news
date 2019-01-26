import sys
import os
import json
import pyjsonrpc
from bson.json_util import dumps
import operations


SERVER_HOST = 'localhost'
SERVER_PORT = 4040

class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """ RPC request handler """
    @pyjsonrpc.rpcmethod
    def add(self, num1, num2):
        """ Test method """
        print("add is called with {} and {}".format(num1, num2))
        return num1 + num2

    @pyjsonrpc.rpcmethod
    def getNewsSummaryForUser(self, user_id, page_num):
        """ Get news summary for the user. """
        return operations.getNewsSummaryForUser(user_id, page_num)

    @pyjsonrpc.rpcmethod
    def logNewsClickForUser(self, user_id, news_id):
        """ Log user news click. """
        return operations.logNewsClickForUser(user_id, news_id)
# Threading HTTP Server
HTTP_SERVER = pyjsonrpc.ThreadingHttpServer(
    server_address=(SERVER_HOST, SERVER_PORT),
    RequestHandlerClass=RequestHandler
)

print("Starting HTTP server on {}:{}".format(SERVER_HOST, SERVER_PORT))

HTTP_SERVER.serve_forever()