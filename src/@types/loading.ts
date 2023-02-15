export type LoadingContextType = {
    loading: boolean;
    showLoading: (loading: boolean) => void;
    hideLoading: () => void;
  };