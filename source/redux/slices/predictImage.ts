import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { predictArtifact, Prediction } from '../../utils/inference';

// Define the slice state for predictions
interface PredictState {
  isLoading: boolean;
  data: Prediction | null;
  error: string | null;
}

// Initial state
const initialState: PredictState = {
  isLoading: false,
  data: null,
  error: null,
};

// Action to clear the prediction state
export const clearPredictImage = createAction('predictImage/clear');

// Async thunk for calling the inference service
export const predictImageAction = createAsyncThunk<
  Prediction,                                     // Return type
  { uri: string; fileName: string; mimeType: string }, // Thunk arg type
  { rejectValue: string }                          // rejectWithValue type
>(
  'predictImage',
  async ({ uri, fileName, mimeType }, { rejectWithValue }) => {
    try {
      const result = await predictArtifact(uri, fileName, mimeType);
      return result;
    } catch (err: any) {
      // Return only the error message string for serializability
      return rejectWithValue(err.message || 'Inference failed');
    }
  }
);

// Slice
const predictImageSlice = createSlice({
  name: 'predictImage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(predictImageAction.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      predictImageAction.fulfilled,
      (state, action: PayloadAction<Prediction>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(predictImageAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? action.error.message ?? 'Unexpected error';
    });
    builder.addCase(clearPredictImage, () => initialState);
  },
});

export default predictImageSlice.reducer;
