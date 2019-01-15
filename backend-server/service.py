import pyjsonrpc

SERVER_HOST = 'localhost'
SERVER_PORT = 4040


class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """ RPC request handler """
    @pyjsonrpc.rpcmethod
    def add(self, num1, num2):
        """ Test method """
        print("add is called with {} and {}".format(num1, num2))
        return num1 + num2


# Threading HTTP Server
HTTP_SERVER = pyjsonrpc.ThreadingHttpServer(
    server_address=(SERVER_HOST, SERVER_PORT),
    RequestHandlerClass=RequestHandler
)

print("Starting HTTP server on {}:{}".format(SERVER_HOST, SERVER_PORT))

HTTP_SERVER.serve_forever()