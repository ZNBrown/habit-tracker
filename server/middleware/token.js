const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const client = require('../dbConfig/redisConfig')
require('dotenv').config();

function verifyToken(req, res, next){
    const header = req.headers['authorization'];
    if (header) {
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            if(err){
                res.status(403).json({ err: 'Invalid token' })
            } else {
                next();
            }
        })
    } else {
        res.status(403).json({ err: 'Missing token' })
    }
}



/* .......redis validation .........*/
try {

    const result = await redisClient.lrange('token',0,99999999)
    if(result.indexOf(token) > -1){
      return res.status(400).json({
        status: 400,
        error: 'Invalid Token'
    })
  }
   /*
     const invalid = (callback) => {
     redisClient.lrange('token', 0, 999999999, (err, result) => 
     callback(result));
  };
    invalid((result) => {
  // check if token has been blacklisted
     if (result.indexOf(token) > -1){
       return res.status(400).json({
        status: 400,
        error: 'Invalid Token',
     });
   }
})
*/
/* ...... ............................*/
 const decrypt = await jwt.verify(token, process.env.SECRET);
  const getUser = 'SELECT * FROM users WHERE id= $1';
  const { rows } = await pool.query(getUser, [decrypt.id]);
  // check if token has expired
  if (!rows[0]) {
    return res.status(403).json({
      status: 403,
      error: ' Token Not accessible',
    });
  }

  next();
} catch (error) {
  return res.status(501).json({
    status: 501,
    error: error.toString(),
  });
}




module.exports = {
    verifyToken
}