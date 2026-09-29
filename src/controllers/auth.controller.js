const userModel = require("../models/user.model")

/**
 * @name registerUserController
 * @description register a new user,expects username , email and password in the request 
 * @access Public
  */
async function registerUserController(req, res) {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]   // either username is equal to username or email is equal to email 
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this username or email address"
        })
    }
}

module.exports = {
    registerUserController
}