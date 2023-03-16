var mongoose = require("mongoose");

async function connectMongo(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected succesfully");
    })
    .catch(() => {
      console.log("MongoDB connection failed");
      process.exit(1)
    });
}

module.exports = { connectMongo };
