const Cache = require("../models/cache");

const getData = async (keyName) => {
  let record = await Cache.find({ key: keyName });
  let result = {};
  if (record.length) {
    result.exists = true;
    result.key = record[0].key;
    result.value = record[0].value;
  } else {
    result.exists = false;
  }
  return result;
};

const setData = async (keyName, value) => {
  const documentCount = await Cache.countDocuments();
  if (documentCount === 100) {
    await Cache.findOneAndDelete({}, { sort: { createdAt: 1 } });
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
};

const getAllKeys = async () => {
  let records = await Cache.find({});
  let keys = [];
  for (let each of records) {
    keys.push(each.key);
  }
  return keys;
};

const deleteKey = async (keyName) => {
  await Cache.deleteOne({ key: keyName });
};

const clearCache = async () => {
  await Cache.deleteMany({});
};

module.exports = { getData, setData, getAllKeys, deleteKey, clearCache };
