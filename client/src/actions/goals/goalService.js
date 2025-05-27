// npm installs
import axios from 'axios';


// STRICTLY FOR MAKING HTTP REQUEST AND SENDING THE DATA TO LOCAL STORAGE
const API_URL = '/api/goals';

/* @desc        creategoal ---------------------------------------------------
*  @route       POST api/goals/
*  @api.index   Create a new Goal ------------------------------------------*/
const createGoal = async(goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    };

    const response = await axios.post(`${API_URL}/`, goalData, config);
    return response.data;
}

/* @desc        getGoals -----------------------------------------------------
*  @route       GET api/goals/
*  @api.index   get all Goals ----------------------------------------------*/
const getGoals = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    };

    const response = await axios.get(`${API_URL}/`, config);
    return response.data;
}

/* @desc        deleteGoal ---------------------------------------------------
*  @route       DELETE api/:id
*  @api.index   Delete Goal ------------------------------------------------*/
const deleteGoal = async(goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    };

    const response = await axios.delete(`${API_URL}/${goalId}`, config);
    return response.data;
}

// export functions to be visible to other files
const goalService = { createGoal, getGoals, deleteGoal };
export default goalService;