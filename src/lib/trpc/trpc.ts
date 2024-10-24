import { createTRPCReact } from '@trpc/react-query';
import { Router } from './routers';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const trpc = createTRPCReact<Router>({});

export type RouterInput = inferRouterInputs<Router>;
export type RouterOutput = inferRouterOutputs<Router>;
