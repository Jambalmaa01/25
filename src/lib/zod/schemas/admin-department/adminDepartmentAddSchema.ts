import { directions } from '@/lib/drizzle/schemas/directionsEnum';
import { zones } from '@/lib/drizzle/schemas/zonesEnum';
import { countryMongoliaId } from '@/lib/drizzle/seed/vars';
import { z } from 'zod';

export const adminDepartmentAddSchema = z.object({
  name: z.string().min(1, 'Нэр хоосон байж болохгүй'),
  codeName: z.string().min(1, 'Отрядын дугаар хоосон байж болохгүй'),
  identityNumber: z.string().min(1, 'Ангийн дугаар хоосон байж болохгүй'),
  countryId: z.string().length(36, 'Улс хоосон байж болохгүй'),
  cityId: z.string().length(36, 'Хот/Аймаг хоосон байж болохгүй'),
  districtId: z.string().length(36, 'Сум/Дүүрэг хоосон байж болохгүй'),
  organizationId: z.string().length(36, 'Анги хоосон байж болохгүй'),

  x: z.coerce.number().min(0),
  y: z.coerce.number().min(0),

  zone: z.enum(zones),
  direction: z.enum(directions),

  establishmentedDate: z.string(),
  ranking: z.string(),
  electricPowerSource: z.string(),
  beverageSource: z.string(),
  beverageSourceNumber: z.coerce.number(),

  lengthResponsibleBorder: z.coerce.number(),
  lengthDryLand: z.coerce.number(),
  lengthWaterBoundaryLength: z.coerce.number(),

  distanceFromBorder: z.coerce.number(),
  distanceFromWestern: z.coerce.number(),
  distanceFromEastern: z.coerce.number(),
  distanceFromDetachment: z.coerce.number(),
  distanceFromDistrict: z.coerce.number(),

  networkMobicom: z.boolean(),
  networkSkytel: z.boolean(),
  networkUnitel: z.boolean(),
  networkGmobile: z.boolean(),
  networkVsat: z.boolean(),
});

export type AdminDepartmentAddSchema = z.infer<typeof adminDepartmentAddSchema>;

export const adminDepartmentAddSchemaDefaultValues: AdminDepartmentAddSchema = {
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
