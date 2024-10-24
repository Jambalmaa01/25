import { createContext } from '@/lib/trpc/context';
import { Router, routers } from '@/lib/trpc/routers';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

function hangler(req: NextRequest) {
  return fetchRequestHandler<Router>({
    endpoint: '/api/trpc',
    req,
    router: routers,
    createContext,
  });
}

export { hangler as GET, hangler as POST };
