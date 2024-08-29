import firestore from '@react-native-firebase/firestore';
import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import collections from '../../constants/collections';
import {
  ArtifactDetails,
  InitialStateArtifactDetails,
} from '../../types/collectionTypes';

export const getArtifactDetailsAction = createAsyncThunk(
  'getArtifactDetails',
  async (docId: string, {rejectWithValue}) => {
    try {
      // Get a reference to the document
      const documentRef = firestore()
        .collection(collections.artifactDetails)
        .doc(docId);

      // Fetch the document
      const documentSnapshot = await documentRef.get();

      // Check if the document exists
      if (documentSnapshot.exists) {
        // Get the document data
        const data = documentSnapshot.data();
        console.log('Document data:', data);

        // Return the document data
        return data as ArtifactDetails;
      } else {
        console.log('No such document!');
        throw Error('No such document!');
      }
    } catch (error: any) {
      const err = error?.message;
      return rejectWithValue(err);
    }
  },
);

export const clearGetArtifactDetails = createAction('CLEAR_ALL');

const initialState: InitialStateArtifactDetails = {
  isLoading: false,
  data: null,
  error: null,
};

const getArtifactDetailsSlice = createSlice({
  name: 'getArtifactDetailsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArtifactDetailsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getArtifactDetailsAction.fulfilled,
      (state, action: PayloadAction<ArtifactDetails>) => {
        state.isLoading = false;
        state.data = action?.payload;
      },
    );
    builder.addCase(getArtifactDetailsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(clearGetArtifactDetails, () => initialState);
  },
});

export default getArtifactDetailsSlice.reducer;
