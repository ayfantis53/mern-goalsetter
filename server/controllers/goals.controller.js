// npm installs
import asyncHandler from 'express-async-handler';

// project imports
import Goal from '../models/goal.model.js';


/* @DESC   get all existing Goals -----------------------------------------------------------------------
*  @ROUTE  GET api/goals/
*  @ACCESS public  -------------------------------------------------------------------------------------*/
export const getGoals = asyncHandler(async(req, res) => {
    // Get all goals in database.
    const goals = await Goal.find({ user: req.user.id });

    res.status(200).json(goals);
});

/* @DESC   Create a new Goal ----------------------------------------------------------------------------
*  @ROUTE  POST api/goals/add/
*  @ACCESS public  -------------------------------------------------------------------------------------*/
export const setGoal = asyncHandler(async(req, res) => {
    // Make sure user not entering empty text.
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please Add a textField');
    }

    // Create goal in database.
    const goal = await Goal.create({ text: req.body.text, user: req.user.id });
    res.status(200).json(goal);
});

/* @DESC   Update a Goal --------------------------------------------------------------------------------
*  @ROUTE  PUT api/goals/:id/
*  @ACCESS private ------------------------------------------------------------------------------------*/
export const updateGoal = asyncHandler(async(req, res) => {
    // Make sure goal is valid.
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal Not Found')
    }

    // Check if user doesnt exist.
    if (!req.user) {
        res.status(401)
        throw new Error('User not found');
    }
    // Check if logged-in-user is goals-user.
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Update goal in database.
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedGoal);
});

/* @DESC   Delete a Goal --------------------------------------------------------------------------------
*  @ROUTE  DELETE api/goals/:id/
*  @ACCESS private ------------------------------------------------------------------------------------*/
export const deleteGoal = asyncHandler(async(req, res) => {
    // Make sure goal is valid.
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal Not Found')
    }

    // Check if user doesnt exist.
    if (!req.user) {
        res.status(401)
        throw new Error('User not found');
    }
    
    // Check if logged-in-user is goals-user.
    if (goal.user.toString() !== req.user.id) {
        console.log(req.user.id, goal.user);
        res.status(401);
        throw new Error('User not authorized to delete');
    }

    // Delete goal in database.
    await goal.deleteOne();
    res.status(200).json({ id: req.params.id });
});