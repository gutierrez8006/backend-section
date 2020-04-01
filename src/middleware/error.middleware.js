module.exports = (err, req, resp, next) => {
    const httpStatus = err.status || 500;

    return resp.status(httpStatus).send({
        status: httpStatus,
        message: err.message || 'Internal server error'
    });
};