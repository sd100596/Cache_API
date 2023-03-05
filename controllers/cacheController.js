const Cache = require("../models/cache")
const { generateRandomString, findDocumentCount } = require("../utils")

const handleGetKey = async (req, res, next) => {
    try {
        const key_name = req.headers["key-name"];
        if (!key_name) {
            return res.send({
                error: "Please provide a key name"
            })
        }

        const record = await Cache.find({ key: key_name })
        const document_count = await findDocumentCount(Cache)
        if (!record.length) {
            const random_value = generateRandomString()

            //Deleting oldest document by Date if limit of 100 is reached
            if (document_count === 100) {
                await Cache.findOneAndDelete({}, { sort: { createdAt: 1 } })
            }
            await Cache.create({
                key: key_name,
                value: random_value,
                createdAt: Date.now()
            })
            res.status(201).send([{ output: "Cache Miss", key: key_name, value: random_value }])
        } else {
            res.send([{ output: "Cache Hit", key: record[0].key, value: record[0].value }])
        }
    }
    catch (err) {
        next(err)
    }
}

const handleGetAllKeys = async (req, res, next) => {
    try {
        const records = await Cache.find({})
        const cache_data = []
        for (let each of records) {
            cache_data.push({ key: each.key, value: each.value })
        }
        res.send(cache_data)
    }
    catch (err) {
        next(err)
    }
}

module.exports = { handleGetKey, handleGetAllKeys }