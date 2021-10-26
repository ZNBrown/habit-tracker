const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    const header = req.headers['authorization'];
    if (header) {
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            console.log("this is in middleware")
            console.log(data);
            console.log("this is in middleware")

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

// const checkUser = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (token) {
//       jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
//         if (err) {
//           res.locals.user = null;
//           next();
//         } else {
//           let user = await User.findById(decodedToken.id);
//           res.locals.user = user;
//           next();
//         }
//       });
//     } else {
//       res.locals.user = null;
//       next();
//     }
//   };
module.exports = {
    verifyToken
}