import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {Gallery, InitialStateGallery} from '../../types/collectionTypes';
import collections from '../../constants/collections';

export const getGalleryAction = createAsyncThunk(
  'getGallery',
  async (_, {rejectWithValue}) => {
    try {
      const querySnapshot = await firestore()
        .collection(collections.gallery)
        .get();
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return data as Gallery[];
    } catch (error: any) {
      const err = error?.message;
      return rejectWithValue(err);
    }
  },
);

export const clearGetGallery = createAction('CLEAR_ALL');

const initialState: InitialStateGallery = {
  isLoading: false,
  data: [],
  error: null,
};

const getGallerySlice = createSlice({
  name: 'getGallerySlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getGalleryAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getGalleryAction.fulfilled,
      (state, action: PayloadAction<Gallery[]>) => {
        state.isLoading = false;
        state.data = action?.payload;
      },
    );
    builder.addCase(getGalleryAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(clearGetGallery, () => initialState);
  },
});

export default getGallerySlice.reducer;
