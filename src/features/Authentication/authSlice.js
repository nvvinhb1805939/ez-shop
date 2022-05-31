import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constant/storage-keys';

export const login = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await userApi.login(payload);

    localStorage.setItem(StorageKeys.TOKEN, JSON.stringify(response.jwt));
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.user));

    return response.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {} },
  reducers: {
    logout: state => {
      localStorage.clear(StorageKeys.TOKEN);
      localStorage.clear(StorageKeys.USER);

      state.current = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
