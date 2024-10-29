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

    x: 0,
    y: 0,

    zone: '',
    direction: '',
    establishmentedDate: '',
    pronunciation: '',
    borderRepresentative: '',
    ranking: '',
    electricPowerSource: '',

    lengthResponsibleBorder: 0,
    lengthDryLand: 0,
    lengthWaterBoundaryLength: 0,

    distanceFromBorder: 0,
    distanceFromWestern: 0,
    distanceFromEastern: 0,
    distanceFromWesternNeighborDetachment: 0,
    distanceFromEasternNeighborDetachment: 0,
    distanceFromUlaanbaatar: 0,
    distanceFromCity: 0,
    distanceFromDistrict: 0,

    networkMobicom: false,
    networkSkytel: false,
    networkUnitel: false,
    networkGmobile: false,

    nerelberM100k: '',
    coordinateM100k: '',
  };
