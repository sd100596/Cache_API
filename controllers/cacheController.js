const httpStatus = require("http-status");
const userServices = require("../services/userServices");

const handleGetKey = async (req, res, next) => {
  try {
    const keyName = decodeURIComponent(req.params.keyName);
    if (!keyName) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "Please provide a key name",
      });
    }

    const result = await userServices.getData(keyName);

    if (!result.exists) {
      //Generate random String
      const randomValue = (Math.random() + 1).toString(36).substring(7);

      console.log("Cache Miss");
      await userServices.setData(keyName, randomValue);

      res.status(httpStatus.CREATED).send({ key: keyName, value: randomValue });
    } else {
      console.log("Cache Hit");
      res.status(httpStatus.OK).send({
        key: result.key,
        value: result.value,
      });
    }
  } catch (err) {
    next(err);
  }
};

const handleGetAllKeys = async (req, res, next) => {
  try {
    const cacheData = {};
    cacheData.keys = await userServices.getAllKeys();
    res.status(httpStatus.OK).send(cacheData);
  } catch (err) {
    next(err);
  }
};

const handleSetKey = async (req, res, next) => {
  try {
    const { key_name: keyName, value } = req.body;
    if (!keyName) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "Please provide a key name",
      });
    } else if (!value) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "Please provide a value",
      });
    }
    await userServices.setData(keyName, value);
    res.status(httpStatus.CREATED).send({
      key: keyName,
      value: value,
    });
  } catch (err) {
    next(err);
  }
};

const handleDeleteKey = async (req, res, next) => {
  try {
    const keyName = decodeURIComponent(req.params.keyName);
    await userServices.deleteKey(keyName);
    res.status(httpStatus.NO_CONTENT).send({ keyDeletion: "success" }); //sending response optional
  } catch (err) {
    next(err);
  }
};

const handleClearCache = async (req, res, next) => {
  try {
    await userServices.clearCache();
    res.status(httpStatus.NO_CONTENT).json({ cacheClear: "success" });
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
