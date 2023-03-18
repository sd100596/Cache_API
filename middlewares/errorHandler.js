const httpStatus = require('http-status');

const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({ message: httpStatus[error.status] || httpStatus[500] });
};

const invalidRoute = (req, res, next) => {
  res.status(404).send({ error: httpStatus[404] });
};

module.exports = { errorHandler, invalidRoute };
