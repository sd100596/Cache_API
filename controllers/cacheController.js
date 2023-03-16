const Cache = require("../models/cache");

const handleGetKey = async (req, res, next) => {
  try {
    const keyName = req.headers["key-name"];
    if (!keyName) {
      return res.status(400).send({
        error: "Please provide a key name",
      });
    }

    const record = await Cache.find({ key: keyName });
    const documentCount = await Cache.countDocuments();

    if (!record.length) {
      //Generate random String
      const randomValue = (Math.random() + 1).toString(36).substring(7);

      //Deleting oldest document by Date if limit of 100 is reached
      if (documentCount === 100) {
        await Cache.findOneAndDelete({}, { sort: { createdAt: 1 } });
      }
      await Cache.create({
        key: keyName,
        value: randomValue,
        createdAt: Date.now(),
      });
      res
        .status(201)
        .send({ output: "Cache Miss", key: keyName, value: randomValue });
    } else {
      res.send({
        output: "Cache Hit",
        key: record[0].key,
        value: record[0].value,
      });
    }
  } catch (err) {
    next(err);
  }
};

const handleGetAllKeys = async (req, res, next) => {
  try {
    const records = await Cache.find({});
    const cacheData = { keys: [] };
    for (let each of records) {
      cacheData.keys.push(each.key);
    }
    res.send(cacheData);
  } catch (err) {
    next(err);
  }
};

const handleSetKey = async (req, res, next) => {
  try {
    const { key_name: keyName, value } = req.body;
    if (!keyName) {
      return res.status(400).send({
        error: "Please provide a key name",
      });
    } else if (!value) {
      return res.status(400).send({
        error: "Please provide a value",
      });
    }
    await Cache.findOneAndUpdate(
      { key: keyName },
      {
        key: keyName,
        value: value,
        createdAt: Date.now(),
      },
      { upsert: true, new: true }
    );
    res.status(201).send({
      output: "Cache data updated",
      key: keyName,
    });
  } catch (err) {
    next(err);
  }
};

const handleDeleteKey = async (req, res, next) => {
  try {
    const keyName = req.headers["key-name"];
    await Cache.deleteOne({ key: keyName });
    res.status(204).send({ keyDeletion: "success" }); //sending response optional
  } catch (err) {
    next(err);
  }
};

const handleClearCache = async (req, res, next) => {
  try {
    await Cache.deleteMany({});
    res.status(204).json({ cacheClear: "success" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleGetKey,
  handleGetAllKeys,
  handleSetKey,
  handleDeleteKey,
  handleClearCache,
};
