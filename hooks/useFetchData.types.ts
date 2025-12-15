export type FetchError = {
    message: string;
    statusCode: number | null;
  };
  
  export type ApiResponseData<T> = {
    isLoading: boolean;
    data: Array<T>;
    error: FetchError | null;
  };