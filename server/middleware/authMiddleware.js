// npm installs
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// project imports
import User from '../models/user.model.js';


/**
 *  Secure routes by verifying user authentication and authorization
 * @param {*} req  The request object containing information about the incoming client request.
 * @param {*} res  The response object used to send responses back to the client.
 * @param {*} next A function to pass control to the next middleware function in the chain.
 * @return void
 */
const protect = asyncHandler(async(req, res, next) => {
    
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header, turn into array where Bearer is first item and token is second.
            token = req.headers.authorization.split(' ')[1];
            // Verify token.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from token.
            req.user = await User.findById(decoded.id).select('-password');

            // Always call next at the end of a middleware function.
            next();
            
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Protect Could Not Authorize');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, not token');
    }
});


// Default exports used because we are exporting a single primary function from this module.
export default protect;