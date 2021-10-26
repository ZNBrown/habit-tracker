const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const { head } = require("../server");

function verifyToken(req, res, next){
    const header = req.headers['authorization'];
    if (header) {
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.SECRET, async (err, data) => {
<<<<<<< HEAD
            console.log("this is in middleware")
            console.log(data);
            console.log("this is in middleware")

=======
>>>>>>> e44aa397282db05207160843b6e46d6208fd2259
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

<<<<<<< HEAD
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
=======
>>>>>>> e44aa397282db05207160843b6e46d6208fd2259
module.exports = {
    verifyToken
}