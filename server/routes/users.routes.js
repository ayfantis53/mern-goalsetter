// npm installs
import express from 'express';

// project imports
import protect from '../middleware/authMiddleware.js';
import { registerUser, loginUser, getMe } from '../controllers/users.controller.js';


/** -------------------------------------------------------------------------------------------
 *  All routes for Users
 ** ----------------------------------------------------------------------------------------- */

// create a new router object which is an isolated instance of middleware and routing functions.
const router = express.Router();

// CREATE routes.
router.route('/').post(registerUser);
router.route('/login').post(loginUser);

// READ routes.
router.route('/me').get(protect, getMe);


// Default exports used because we are exporting a single primary variable from this module.
export default router;