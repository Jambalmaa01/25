import { getFetch, httpBatchLink, loggerLink } from '@trpc/client';
import superjson from 'superjson';
import { trpc } from '@/lib/trpc/trpc';

const url = process.env.NEXT_PUBLIC_URL as string;

export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';

  return url;
}

function getAccessToken() {
  const token = localStorage.getItem('access_token');

  if (!token) return '';

  return token.slice(1, -1);
}

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      fetch: async (input, init?) => {
        const fetch = getFetch();

        return fetch(input, {
          ...init,
          credentials: 'include',
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
      },
    }),
    loggerLink({
      // enabled: () => process.env.NODE_ENV === 'development',
      enabled: () => false,
    }),
  ],
  transformer: superjson,
});
