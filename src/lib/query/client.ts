import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 5000,
      // retry: false,
      // retryDelay: 0,
      // refetchInterval: false,
      // retryOnMount: true, // here
      // refetchIntervalInBackground: false,
      // refetchOnMount: true, // here
      // refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // keepPreviousData: true,

      networkMode: process.env.NODE_ENV === 'development' ? 'always' : 'online',
    },

    mutations: {
      networkMode: process.env.NODE_ENV === 'development' ? 'always' : 'online',
    },
  },
});
