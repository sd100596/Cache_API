const express = require("express")
const router = express.Router()
const { handleGetKey, handleGetAllKeys, handleUpsertKey, handleDeleteKey, handleClearCache } = require("../controllers/cacheController")

router.get('/fetch-key', handleGetKey)
router.get('/fetch-all-keys', handleGetAllKeys)
router.post('/upsert-key', handleUpsertKey)
router.delete('/delete-key', handleDeleteKey)
router.delete('/clear', handleClearCache)

module.exports = router;