import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'components/authorization/slice/authSlice';
import userReducer from 'components/main/authMain/user_data/userDataSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        userData: userReducer,
    }
});

export default store;