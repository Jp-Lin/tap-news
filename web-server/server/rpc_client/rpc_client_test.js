var client = require('./rpc_client');

// invoke 'add'
client.add(1, 2, function(response) {
  console.assert(response == 3)
});

client.getNewsSummaryForUser('test_user', 1, function(response) {
  console.assert(response != null);
})

client.logNewsClickForUser('test_user', 'test_news');