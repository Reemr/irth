import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiInitialState, ApiResponse} from '../../types/apiTypes';
import apiRoutes from '../../constants/apiRoutes';

export const predictImageAction = createAsyncThunk(
  'predictImage',
  async (requestData, {rejectWithValue}) => {
    try {
      const res: ApiResponse = await axios.post(apiRoutes.predict, requestData);
      const data: any = await res?.data;
      if (data?.status == 'error') {
        throw data;
      } else {
        return data;
      }
    } catch (error: any) {
      const err = error?.response?.data || error;
      return rejectWithValue(err);
    }
  },
);

const initialState: ApiInitialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const clearPredictImage = createAction('CLEAR_ALL');

const predictImageSlice = createSlice({
  name: 'predictImageSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(predictImageAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      predictImageAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(predictImageAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(clearPredictImage, () => initialState);
  },
});

export default predictImageSlice.reducer;
