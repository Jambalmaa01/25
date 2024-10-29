import { directions } from '@/lib/drizzle/schemas/directionsEnum';
import { zones } from '@/lib/drizzle/schemas/zonesEnum';
import { countryMongoliaId } from '@/lib/drizzle/seed/vars';
import { z } from 'zod';

export const adminOrganizationAddSchema = z.object({
  name: z.string().min(1, 'Нэр хоосон байж болохгүй'),
  codeName: z.string().min(1, 'Отрядын дугаар хоосон байж болохгүй'),
  identityNumber: z.string().min(1, 'Ангийн дугаар хоосон байж болохгүй'),
  countryId: z.string().length(36, 'Улс хоосон байж болохгүй'),
  cityId: z.string().length(36, 'Хот/Аймаг хоосон байж болохгүй'),
  districtId: z.string().length(36, 'Сум/Дүүрэг хоосон байж болохгүй'),

  x: z.coerce.number().min(0),
  y: z.coerce.number().min(0),

  zone: z.enum(zones),
  direction: z.enum(directions),

  establishmentedDate: z.string(),
  pronunciation: z.string(),
  borderRepresentative: z.string(),
  ranking: z.string(),
  electricPowerSource: z.string(),

  lengthResponsibleBorder: z.coerce.number(),
  lengthDryLand: z.coerce.number(),
  lengthWaterBoundaryLength: z.coerce.number(),

  distanceFromBorder: z.coerce.number(),
  distanceFromWestern: z.coerce.number(),
  distanceFromEastern: z.coerce.number(),
  distanceFromWesternNeighborDetachment: z.coerce.number(),
  distanceFromEasternNeighborDetachment: z.coerce.number(),
  distanceFromUlaanbaatar: z.coerce.number(),
  distanceFromCity: z.coerce.number(),
  distanceFromDistrict: z.coerce.number(),

  networkMobicom: z.boolean(),
  networkSkytel: z.boolean(),
  networkUnitel: z.boolean(),
  networkGmobile: z.boolean(),

  nerelberM100k: z.string(),
  coordinateM100k: z.string(),
});

export type AdminOrganizationAddSchema = z.infer<
  typeof adminOrganizationAddSchema
>;

export const adminOrganizationAddSchemaDefaultValues: AdminOrganizationAddSchema =
  {
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

    networkMobicom: true,
    networkSkytel: true,
    networkUnitel: true,
    networkGmobile: true,

    nerelberM100k: '',
    coordinateM100k: '',
  };
