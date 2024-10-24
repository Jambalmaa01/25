import { procedure } from '../server';

export const publicProcedure = procedure.use(async ({ next, ...opts }) => {
  return next(opts);
});
