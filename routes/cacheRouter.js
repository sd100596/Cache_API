const express = require("express");
const {
  handleGetKey,
  handleGetAllKeys,
  handleSetKey,
  handleDeleteKey,
  handleClearCache,
} = require("../controllers/cacheController"); //Fetching the Cache Controller
const router = express.Router();

// Method: GET --> Get value for a specific key
// Method: DELETE --> DELETE a key,value pair
router.route("/keys/:keyName")
  .get(handleGetKey)
  .delete(handleDeleteKey);

// Method: GET --> Get all keys
// Method: POST --> Add/Update a key,value pair
router.route("/keys")
  .get(handleGetAllKeys)
  .post(handleSetKey);

// Method: DELETE --> CLEAR the cache
router.delete("/clear", handleClearCache);

module.exports = router;
