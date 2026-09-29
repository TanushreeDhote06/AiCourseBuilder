const { Router } = require('express')
const authController = require("../controllers/auth.controller")
const authRouter = Router()
/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access Public
 * 
 */
// authRouter.post('/register', registerController)
module.exports = authRouter1