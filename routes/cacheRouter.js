const express = require("express")
const router = express.Router()
const { handleGetKey, handleGetAllKeys, handleSetKey, handleDeleteKey, handleClearCache } = require("../controllers/cacheController")    //Fetching the Cache Controller

router.get('/get', handleGetKey)                    //GET key's value
router.get('/keys', handleGetAllKeys)               //GET all keys
router.post('/set', handleSetKey)                //Add new key,value pair
router.delete('/delete', handleDeleteKey)           //DELETE a key,value pair
router.delete('/clear', handleClearCache)           //CLEAR the cache

module.exports = router;