export interface MediaState {
  isLoading: boolean;
  error?: any;
}

export const initialMediaState: MediaState = {
  isLoading: false,
};
