// npm installs
import jwt from 'jsonwebtoken';


/**
 * Create a unique token, often for authentication/identification purposes
 * @param {*} id used to create a unique and secure token drom user's id in db. 
 * @returns a unique token that lasts 30d
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}


// Default exports used because we are exporting a single primary function from this module.
export default generateToken;