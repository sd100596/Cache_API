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
            res.status(201).send({ output: "Cache Miss", key: key_name, value: random_value })
        } else {
            res.send({ output: "Cache Hit", key: record[0].key, value: record[0].value })
        }
    }
    catch (err) {
        next(err)
    }
}

const handleGetAllKeys = async (req, res, next) => {
    try {
        const records = await Cache.find({})
        const cache_data = { keys: [] }
        for (let each of records) {
            cache_data.keys.push(each.key)
        }
        res.send(cache_data)
    }
    catch (err) {
        next(err)
    }
}

const handleUpsertKey = async (req, res, next) => {
    try {
        const { key_name, value } = req.body;
        if (!key_name) {
            return res.status(400).send({
                error: "Please provide a key name"
            })
        }
        else if (!value) {
            return res.status(400).send({
                error: "Please provide a value"
            })
        }
        await Cache.findOneAndUpdate({ key: key_name },
            {
                key: key_name,
                value: value,
                createdAt: Date.now()
            },
            { upsert: true, new: true })
        res.status(201).send({
            output: "Cache data updated",
            key: key_name
        })
    }
    catch (err) {
        next(err)
    }
}

const handleDeleteKey = async (req, res, next) => {

    try {
        const key_name = req.headers["key-name"];
        await Cache.deleteOne({ key: key_name })
        res.status(204).send({ key_deletion: "success" })   //sending response optional
    } catch (err) {
        next(err)
    }
}

const handleClearCache = async (req, res, next) => {
    try {
        await Cache.deleteMany({})
        res.status(204).json({ cache_clear: "success" })
    } catch (err) {
        next(err)
    }
}

module.exports = { handleGetKey, handleGetAllKeys, handleUpsertKey, handleDeleteKey, handleClearCache }