import { useCallback, useState, ReactNode, createContext, useContext } from 'react';
import { LoadingContextType } from '../@types/loading';

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const useLoadingContext = () => useContext(LoadingContext)

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingContextProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true)

  const showLoading = useCallback((loading: boolean) => {
    setLoading(loading)
    return loading
  }, [])

  const hideLoading = useCallback(() => {
    setLoading(false)
  }, [])

  const value = { loading, hideLoading, showLoading }

  return (
    <LoadingContext.Provider value={value} >
      {children}
    </LoadingContext.Provider>
  );
};
