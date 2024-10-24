import * as queryRouters from './queries';
import * as mutationRouters from './mutations';
import { mergeRouters, router } from '../server';

export const routers = mergeRouters(
  router(queryRouters),
  router(mutationRouters)
);

export type Router = typeof routers;
