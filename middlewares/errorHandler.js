const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500)
    res.send({ message: error.message || "Something went wrong" })
}

module.exports = errorHandler;