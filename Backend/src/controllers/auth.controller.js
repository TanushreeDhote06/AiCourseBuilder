const userModel = require("../models/user.model")
const tokenBlacklistModel = require("../models/blacklist.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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
        //what does this syntax do ? it accepts two conditions {query1,query2} & check if any of them is true
        //if found it returns the document
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this username or email address"
        })
    }
    //create a new user 
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
    })
    const token = jwt.sign({
        id: user._id, username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully",
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        }

        //why are we not sending the token here ?
        // because we are setting it in the http cookie and we will be able to access it using req.cookies.token in the frontend ,if we created a mobile app , we would need to send the token because mobile apps can't access cookies

    })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the req body ,
 * @access Public
 */
async function loginUserController(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)


    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign(  //sign method is responsible for creating a new token , which is basically a signed string 
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        }
    })

}

/**
 * @name logoutUserController
 * @description logs out the user by clearing the token from the cookie and adding it to the blacklist 
 * @access Public //why? because any user can logout at any time, no need to be authenticated 
 */
async function logoutUserController(req, res) {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1]

    if (token) {
        await tokenBlacklistModel.create({ token })
    }
    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        }
    })
}
module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
