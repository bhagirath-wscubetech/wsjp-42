const { verifyToken } = require("../helper");

const adminAuth = (req, res, next) => {
    next();
    // const authToken = req?.headers?.authorization;
    // if (authToken) {
    //     if (verifyToken(authToken)) {
    //         next(); // jo karne aaye the vo karlo
    //     } else {
    //         res.send({
    //             status: 0,
    //             msg: "Invalid access token"
    //         })
    //     }
    // } else {
    //     res.send({
    //         status: 0,
    //         msg: "Access token is missing"
    //     })
    // }
}

module.exports = adminAuth;