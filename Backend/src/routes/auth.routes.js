const { Router } = require('express')
const authController = require("../controllers/auth.controller")
const authRouter = Router()
const authMiddleware = require("../middlewares/auth.middleware")
/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access Public
 * 
 */
authRouter.post("/register", authController.registerUserController)
/**
 * @route POST /api/auth/login
 * @description login a user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Private
 */
authRouter.get("/logout", authController.logoutUserController)
/**
 * @route GET /api/auth/get-me
 * @description get logged in user info
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)
module.exports = authRouter