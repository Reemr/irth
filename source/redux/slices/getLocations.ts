import firestore from '@react-native-firebase/firestore';
import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import collections from '../../constants/collections';
import {InitialStateLocation, Location} from '../../types/collectionTypes';

export const getLocationsAction = createAsyncThunk(
  'getLocations',
  async (_, {rejectWithValue}) => {
    try {
      const querySnapshot = await firestore()
        .collection(collections.locations)
        .get();
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return data as Location[];
    } catch (error: any) {
      const err = error?.message;
      return rejectWithValue(err);
    }
  },
);

export const clearGetLocations = createAction('CLEAR_ALL');

const initialState: InitialStateLocation = {
  isLoading: false,
  data: [],
  error: null,
};

const getLocationsSlice = createSlice({
  name: 'getLocationsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLocationsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getLocationsAction.fulfilled,
      (state, action: PayloadAction<Location[]>) => {
        state.isLoading = false;
        state.data = action?.payload;
      },
    );
    builder.addCase(getLocationsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(clearGetLocations, () => initialState);
  },
});

export default getLocationsSlice.reducer;
