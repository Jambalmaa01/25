import { pgEnum } from 'drizzle-orm/pg-core';

export const directions = ['ҮХТЧ', 'Бусад', 'ХЗГБЧ', 'ОНБҮБЧ'] as const;

export type DirectionEnum = (typeof directions)[number];

export const directionsEnum = pgEnum('directions', directions);
