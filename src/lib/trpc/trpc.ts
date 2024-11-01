import { createTRPCReact } from '@trpc/react-query';
import { Router } from './routers';
import {
  inferRouterInputs,
  inferRouterOutputs,
  inferRouterError,
  inferProcedureClientError,
  AnyProcedure,
} from '@trpc/server';

export const trpc = createTRPCReact<Router>({});

export type RouterInput = inferRouterInputs<Router>;
export type RouterOutput = inferRouterOutputs<Router>;
export type RouterError = inferRouterError<Router>;
export type RouterClientError<T extends AnyProcedure> =
  inferProcedureClientError<T>;
