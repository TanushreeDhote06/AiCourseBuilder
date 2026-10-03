//file to start the server 
require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const { resume, jobDescription, selfDescription } = require("./src/services/temp.js")
const PORT = process.env.PORT || 3000
const generateInterviewReport = require("./src/services/ai.service.js")

generateInterviewReport({ resume, selfDescription, jobDescription })
connectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
})
