import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/storage';
import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import collections from '../../constants/collections';
import axios from 'axios';

export const uploadArtifactDetailsAction = createAsyncThunk(
  'uploadArtifactDetails',
  async (uploadData: any, {rejectWithValue}) => {
    try {
      const storageRef = firebase
        .storage()
        .ref(`images/${uploadData?.image?.name}`);

      // Fetch the image file as a blob
      const response = await axios.get(uploadData?.image?.uri, {
        responseType: 'blob',
      });
      // Upload the file to Firebase Storage
      const uploadTask = storageRef.put(response.data);
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          throw error;
        },
        async () => {
          // Get the download URL
          const downloadUrl = await storageRef.getDownloadURL();
          console.log('File available at', downloadUrl);

          // Store Content in Artifact Details collection
          const artifcatDetailsRef = firestore()
            .collection(collections.artifactDetails)
            .doc();
          await artifcatDetailsRef.set(uploadData?.content);

          // Store the download URL in Gallary Collection
          const galleryRef = firestore().collection(collections.gallery).doc();
          await galleryRef.set({
            detailId: artifcatDetailsRef?.id,
            image: downloadUrl,
          });

          console.log('Image URL stored in Firestore');
          console.log('Document ID:', artifcatDetailsRef.id);
        },
      );
    } catch (error: any) {
      console.log('error:>>>>', error);

      const err = error?.message;
      return rejectWithValue(err);
    }
  },
);

export const clearUploadArtifactDetails = createAction('CLEAR_ALL');

const initialState: any = {
  isLoading: false,
  data: null,
  error: null,
};

const uploadArtifactDetailsSlice = createSlice({
  name: 'uploadArtifactDetailsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(uploadArtifactDetailsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      uploadArtifactDetailsAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action?.payload;
      },
    );
    builder.addCase(uploadArtifactDetailsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(clearUploadArtifactDetails, () => initialState);
  },
});

export default uploadArtifactDetailsSlice.reducer;
