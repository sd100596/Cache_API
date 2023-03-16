const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({ message: error.message || "Something went wrong" });
};

const invalidRoute = (req, res, next) => {
  res.status(404).send({ error: "Invalid Route" });
};

module.exports = { errorHandler, invalidRoute };
