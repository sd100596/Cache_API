require('dotenv').config()
const express = require('express');
const { connectMongo } = require('./connection')
const app = express()
const errorHandler = require("./middlewares/errorHandler")
const cacheRouter = require("./routes/cacheRouter")

//fetching mongodb url from the env file
connectMongo(process.env.MONGODB_URI)

app.use(express.json());

app.use("/cache", cacheRouter)
app.use(errorHandler)

app.listen(process.env.PORT)