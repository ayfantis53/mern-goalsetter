// npm installs
import bcrypt       from 'bcrypt';
import asyncHandler from 'express-async-handler';

// project imports
import User from '../models/user.model.js';
import generateToken from '../lib/userToken.js';


/* @DESC   Register a new User---------------------------------------------------------------------------
*  @ROUTE  POST api/users/
*  @ACCESS public -------------------------------------------------------------------------------------*/
export const registerUser = asyncHandler(async(req, res) => {
    // Validate all fields are in request.
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all required fields');
    }
    // Validate user exists by finding by email.
    const userExists     = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }
    // Hash password.
    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with hash encrypted password.
    const user           = await User.create({ name, email, password: hashedPassword});
    if (user) { 
        res.status(201).json({ _id:   user.id, 
                               name:  user.name, 
                               email: user.email, 
                               token: generateToken(user._id) })
    }
    else {
        res.status(400)
        throw new Error('Invalid creation');
    }
});

/* @DESC   Authenticate a User --------------------------------------------------------------------------
*  @ROUTE  POST api/users/login
*  @ACCESS public -------------------------------------------------------------------------------------*/
export const loginUser = asyncHandler(async(req, res) => {
    // Make sure user and email combo exist in db.
    const { email, password } = req.body;
    const user                = await User.findOne({ email });

    // Validate password is correct.
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({ _id:   user.id,    
                               name:  user.name, 
                               email: user.email, 
                               token: generateToken(user._id) })
    }
    else {
        res.status(400)
        throw new Error('Invalid Credentials');
    }
});

/* @DESC   Get user data --------------------------------------------------------------------------------
*  @ROUTE  GET api/users/me
*  @ACCESS private ------------------------------------------------------------------------------------*/
export const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user);
});
