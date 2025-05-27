// npm installs
import axios from 'axios';


// STRICTLY FOR MAKING HTTP REQUEST AND SENDING THE DATA TO LOCAL STORAGE

const API_URL = '/api/users';

/* @desc        register -----------------------------------------------------
*  @route       POST /api/users
*  @api.index   register ---------------------------------------------------*/
const register = async(userData) => {
    const response = await axios.post(`${API_URL}/`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// @desc        login --------------------------------------------------------
// @route       POST /api/login                                             
// @api.index   login ------------------------------------------------------*/
const login = async(userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// @desc        logout -------------------------------------------------------
// @route       POST /api/logout                                             
// @api.index   logout ------------------------------------------------------*/
const logout = async() => {
    localStorage.removeItem('user');
}


// export functions to be visible to other files
const authService = { register, logout, login };
export default authService;