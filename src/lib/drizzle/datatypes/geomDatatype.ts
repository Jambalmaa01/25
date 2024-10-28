import { customType } from 'drizzle-orm/pg-core';

export const geom = customType<{ data: string }>({
  dataType() {
    return 'geometry(Geometry, 4326)';
  },
});
