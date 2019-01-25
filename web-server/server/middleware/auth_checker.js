const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
    //console.log('auth_checker: req: ', req.headers);
  
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    // console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    //console.log('auth_checker: token: ' + token);

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) {return res.status(401).end(); }
        // console.log(decoded);
        const sub = decoded.sub;
        return User.findById(sub, (userErr, user) => {
            if (userErr || !user) {
              return res.status(401).end();
            }
            return next();
          });        
    });
}