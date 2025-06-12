// npm installs
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project imports
import authService from './authService';


// Get user from local storage.
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user:      user ? user : null,
    isError:   false,
    isSuccess: false,
    message:   ''
};

// register user calling authservice register user api call.
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// login user calling authservice login user api call.
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// logout user calling authservice logout user api call.
export const logout = createAsyncThunk('auth/logout', async(user, thunkAPI) => {
    return await authService.logout(user);
});

// State Management.
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError   = false
            state.message   = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user      = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError   = true
                state.message   = action.payload
                state.user      = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError   = true
                state.message   = action.payload
                state.user      = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user      = null
            })
    },
});

// export functions to be visible to other files.
export const { reset } = authSlice.actions;
export default authSlice.reducer;