const express = require('express');
const rpc_client = require('../rpc_client/rpc_client');
const router = express.Router();

/* GET users listing. */
router.get('/userId/:userId/pageNum/:pageNum', function(req, res, next) {
  news = [{
    'url': 'https://www.cnn.com/2019/01/07/media/networks-trump-border-security-speech/index.html',
    'title': 'Broadcast networks and cable channels set to air Trump\'s prime time immigration address',
    'description': 'The major television networks will provide wall-to-wall coverage of President Donald Trump\'s prime time address on border security on Tuesday.',
    'source': 'cnn',
    'urlToImage': 'https://s2-ssl.dmcdn.net/u7jO2/x1080-xe9.jpg',
    'digest': '1',
    'reason': 'Recommend'
  }];
  console.log('Fetching news...');
  user_id = req.params['userId'];
  page_num = req.params['pageNum'];

  rpc_client.getNewsSummaryForUser(user_id, page_num, response => {
    res.json(response);
  });
});

module.exports = router;
