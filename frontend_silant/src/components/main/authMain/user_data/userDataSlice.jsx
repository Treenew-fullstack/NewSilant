import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        user_first_name: '',
        user_is_staff: '',
    },
    reducers: {
        setUserFirstName: (state, action) => {
            state.user_first_name = action.payload;
        },
        setUserIsStaff: (state, action) => {
            state.user_is_staff = action.payload;
        },
    },
});

export const { setUserFirstName, setUserIsStaff } = userDataSlice.actions;
export default userDataSlice.reducer;