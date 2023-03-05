const express = require("express")
const router = express.Router()
const { handleGetKey, handleGetAllKeys } = require("../controllers/cacheController")

router.get('/fetch-key', handleGetKey)
router.get('/fetch-all-keys', handleGetAllKeys)

module.exports = router;