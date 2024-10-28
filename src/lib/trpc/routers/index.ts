import * as adminCityRouters from './admin-city';
import * as adminCountryRouters from './admin-country';
import * as adminDistrictRouters from './admin-district';
import * as mutationRouters from './mutations';
import { mergeRouters, router } from '../server';

export const routers = mergeRouters(
  router(adminCityRouters),
  router(adminCountryRouters),
  router(adminDistrictRouters),
  router(mutationRouters)
);

export type Router = typeof routers;
