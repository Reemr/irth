import config from './config';

export const vertexTokenURL = 'https://oauth2.googleapis.com/token';
export const vertexCloudURL = 'https://www.googleapis.com/auth/cloud-platform';

const baseURL = 'https://us-central1-aiplatform.googleapis.com/v1/projects/';

export default {
  predict: `${baseURL}${config.PROJECT_ID}/locations/us-central1/endpoints/${config.ENDPOINT_ID}:predict`,
};
