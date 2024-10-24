export const dateRangeOptions = [
  'Арилгах',
  'Өнөөдөр',
  'Өчигдөр',
  'Уржигдар',
  'Энэ 7 хоног',
  'Өнгөрсөн 7 хоног',
  'Энэ сар',
  'Өнгөрсөн сар',
  'Энэ жил',
  'Өнгөрсөн жил',
] as const;

export type DateRangeOption = (typeof dateRangeOptions)[number];
