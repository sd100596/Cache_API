require("dotenv").config();
const express = require("express");
const connectMongo = require("./connection.js");
const { errorHandler, invalidRoute } = require("./middlewares/errorHandler.js");
const cacheRouter = require("./routes/cacheRouter.js");
const app = express()
const helmet = require("helmet");
const cors = require("cors");

connectMongo(process.env.MONGODB_URI); 

app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 

app.use("/cache", cacheRouter); 

app.use("*", invalidRoute); 
app.use(errorHandler); 

app.listen(process.env.PORT, function (err) {
  if (err) console.log("Error in starting server");
  else console.log("Server has been started at port " + process.env.PORT);
});

module.exports = app;
