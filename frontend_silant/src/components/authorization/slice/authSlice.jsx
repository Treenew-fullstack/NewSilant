import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const accessToken = localStorage.getItem('accessToken');


  return accessToken ? true : false;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    accessToken: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = null;

      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
