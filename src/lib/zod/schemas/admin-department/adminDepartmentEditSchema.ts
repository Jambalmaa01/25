import { z } from 'zod';
import { adminDepartmentAddSchema } from './adminDepartmentAddSchema';
import { countryMongoliaId } from '@/lib/drizzle/seed/vars';

export const adminDepartmentEditSchema = adminDepartmentAddSchema.extend({
  departmentId: z.string().length(36, 'Дугаар хоосон байж болохгүй'),
});

export type AdminDepartmentEditSchema = z.infer<
  typeof adminDepartmentEditSchema
>;

export const adminDepartmentEditSchemaDefaultValues: AdminDepartmentEditSchema =
  {
    departmentId: '',
    name: '',
    codeName: '',
    identityNumber: '',
    countryId: countryMongoliaId,
    cityId: '',
    districtId: '',
    organizationId: '',

    x: 0,
    y: 0,

    zone: '',
    direction: '',
    establishmentedDate: '',
    ranking: '',
    electricPowerSource: '',
    beverageSource: '',
    beverageSourceNumber: 0,

    lengthResponsibleBorder: 0,
    lengthDryLand: 0,
    lengthWaterBoundaryLength: 0,

    distanceFromBorder: 0,
    distanceFromWestern: 0,
    distanceFromEastern: 0,
    distanceFromDetachment: 0,
    distanceFromDistrict: 0,

    networkMobicom: true,
    networkSkytel: true,
    networkUnitel: true,
    networkGmobile: true,
    networkVsat: true,
  };
