export type ApiResponse = {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
};

export type ApiInitialState = {isLoading: boolean; data: any; error: any};
