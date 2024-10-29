import * as adminCityRouters from './admin-city';
import * as adminCountryRouters from './admin-country';
import * as adminDepartmentRouters from './admin-department';
import * as adminDistrictRouters from './admin-district';
import * as adminOrganizationRouters from './admin-organization';
import * as mutationRouters from './mutations';
import { mergeRouters, router } from '../server';

export const routers = mergeRouters(
  router(adminCityRouters),
  router(adminCountryRouters),
  router(adminDistrictRouters),
  router(mutationRouters),
  router(adminOrganizationRouters),
  router(adminDepartmentRouters)
);

export type Router = typeof routers;
