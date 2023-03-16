const express = require("express");
const router = express.Router();
const {
  handleGetKey,
  handleGetAllKeys,
  handleSetKey,
  handleDeleteKey,
  handleClearCache,
} = require("../controllers/cacheController"); //Fetching the Cache Controller

//Get value for a specific key
router.get("/get", handleGetKey);

//Get all keys
router.get("/keys", handleGetAllKeys);

//Add/Update a key,value pair
router.post("/set", handleSetKey);

//DELETE a key,value pair
router.delete("/delete", handleDeleteKey);

//CLEAR the cache
router.delete("/clear", handleClearCache);

module.exports = router;
