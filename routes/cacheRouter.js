const express = require("express")
const router = express.Router()
const { handleGetKey, handleGetAllKeys, handleUpsertKey, handleDeleteKey, handleClearCache } = require("../controllers/cacheController")    //Fetching the Cache Controller

router.get('/fetch-key', handleGetKey)                  //GET key's value
router.get('/fetch-all-keys', handleGetAllKeys)         //GET all keys
router.post('/upsert-key', handleUpsertKey)             //Add new key,value pair
router.delete('/delete-key', handleDeleteKey)           //DELETE a key,value pair
router.delete('/clear', handleClearCache)               //CLEAR the cache

module.exports = router;