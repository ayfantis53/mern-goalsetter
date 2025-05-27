// npm installs
import express from 'express';

// project imports
import protect from '../middleware/authMiddleware.js';
import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goals.controller.js';


/** -------------------------------------------------------------------------------------------
 *  All routes for Goals
 ** ----------------------------------------------------------------------------------------- */

// create a new router object which is an isolated instance of middleware and routing functions.
const router = express.Router();

// READ routes.
router.route('/').get(protect, getGoals).post(protect, setGoal);

// UPDATE routes.
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);


// Default export because we are exporting a single primary variable from this module.
export default router;