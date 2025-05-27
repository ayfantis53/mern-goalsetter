/**
 * middleware function specifically designed to handle errors in applications
 * @param {*} err  The error object representing the error that occurred.
 * @param {*} req  The request object containing information about the incoming client request.
 * @param {*} res  The response object used to send responses back to the client.
 * @param {*} next A function to pass control to the next middleware function in the chain.
 */
const errorHandler = (err, req, res, next) => {
    // Want to get the status code if it already exists if not make it a 500.
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    // display it as json with message and stack trace if in development mode.
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
};


// Default exports used because we are exporting a single primary function from this module.
export default errorHandler;