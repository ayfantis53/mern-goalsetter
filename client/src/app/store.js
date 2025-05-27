// npm installs
import { configureStore } from '@reduxjs/toolkit';

// project imports
import authReducer from '../actions/auth/authSlice';
import goalReducer from '../actions/goals/goalSlice';


/**
 * 
 * @return Our credentials and goal making stores for api requests
 */
export const store = configureStore({
  reducer: {
    auth:  authReducer,
    goals: goalReducer,
  },
});
