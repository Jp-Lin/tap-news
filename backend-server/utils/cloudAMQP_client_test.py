""" cloudamqp client test"""

from cloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = 'amqp://ifnbkfix:ib9jYqRnjRDtxUh3enEzfeFr4UDi4OC7@shark.rmq.cloudamqp.com/ifnbkfix'
TEST_QUEUE_NAME = 'test'

def test_basic():
    """ test_basic"""
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)

    sent_msg = {'test': 'test'}
    client.send_message(sent_msg)
    client.sleep(5)
    received_msg = client.get_message()

    assert sent_msg == received_msg
    print 'test_basic passed.'

if __name__ == '__main__':
    test_basic()