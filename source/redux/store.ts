import {configureStore} from '@reduxjs/toolkit';
import getGallery from './slices/getGallery';
import getLocations from './slices/getLocations';
import getArtifactDetails from './slices/getArtifactDetails';
import uploadArtifactDetails from './slices/uploadArtifactDetails';
import predictImage from './slices/predictImage';
import getVertexToken from './slices/getVertexToken';

const store = configureStore({
  reducer: {
    getGallery,
    getLocations,
    getArtifactDetails,
    uploadArtifactDetails,
    predictImage,
    getVertexToken,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
