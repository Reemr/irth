import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiInitialState, ApiResponse} from '../../types/apiTypes';
import apiRoutes, {
  vertexCloudURL,
  vertexTokenURL,
} from '../../constants/apiRoutes';
import getJWT from '../../utils/createJWT';

const SERVICE_ACCOUNT_KEY = require('../../constants/irth-410112-599f207d6d91.json');

export const getVertexTokenAction = createAsyncThunk(
  'getVertexToken',
  async (_, {rejectWithValue}) => {
    try {
      const {client_email, private_key} = SERVICE_ACCOUNT_KEY;
      // Payload for the JWT
      const payload = {
        iss: client_email,
        scope: vertexCloudURL,
        aud: vertexTokenURL,
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
      };

      // Encode the JWT using createJWT
      const token = getJWT(payload, private_key);

      // Request access token from Google OAuth 2.0 token endpoint
      const res: ApiResponse = await axios.post(vertexTokenURL, {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      });
      const data: any = await res.data;
      if (data?.access_token) {
        return {token: data?.access_token};
      } else {
        throw new Error('Token not found');
      }
    } catch (error: any) {
      const err = error?.response?.data || error;
      console.log('error token:>>>>>>', err);

      return rejectWithValue(err);
    }
  },
);

const initialState: ApiInitialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const clearGetVertexToken = createAction('CLEAR_ALL');

const getVertexTokenSlice = createSlice({
  name: 'getVertexTokenSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getVertexTokenAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getVertexTokenAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(getVertexTokenAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(clearGetVertexToken, () => initialState);
  },
});

export default getVertexTokenSlice.reducer;
