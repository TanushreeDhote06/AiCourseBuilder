const jwt = require('jsonwebtoken')
const tokenBlacklistModel = require("../models/blacklist.model")
/**
 * @name authUser
 * @description finds out which user is making the request by checking the token sent in the request 
 * @access private
 */
async function authUser(req, res, next) {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not provided" })
    }
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })
    if (isTokenBlacklisted) {
        return res.status(401).json({ message: "Token is invalid" })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) //jwt.verify:method to verify the token,if token is correct,data is returned else error is thrown
        req.user = decodedToken //the data is then stored into req and can be used in the next middleware or any purpose 
        //ky pehle req me user property exist kr rhi thi ?? ans is no , we created the property 
        next() //calls the next function/middleware
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }

}

module.exports = { authUser }