const mongoose = require("mongoose");

//Creating schema for Cache collection
const cacheSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: { type: Date, expires: 3600, default: Date.now }, //Documents set to delete after 1 hour
});

//Creating Cache model and exporting it
module.exports = mongoose.model("Cache", cacheSchema);
