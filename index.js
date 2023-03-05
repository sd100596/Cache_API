require('dotenv').config()
const express = require('express');
const { connectMongo } = require('./connection')
const app = express()
const { errorHandler, invalidRoute } = require("./middlewares/errorHandler")
const cacheRouter = require("./routes/cacheRouter")
const helmet = require('helmet');
const cors = require('cors')
const port = process.env.PORT;

connectMongo(process.env.MONGODB_URI)   //fetching mongodb url from the env file

app.use(helmet())                       //Added layers of security
app.use(cors());                        //Allowing cross origin resource sharing
app.use(express.json());                //Body parser for json data

app.use("/cache", cacheRouter)          //Created API router for /cache paths

app.use("*", invalidRoute)              //To handle invalid routes
app.use(errorHandler)                   //Error Handler for catching unknown errors

app.listen(port, function (err) {
    if (err)
        console.log("Error in starting server")
    else
        console.log("Server has been started at port " + port)
})

module.exports = app;