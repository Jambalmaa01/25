import { DateRangeOption } from '@/variables';
import dayjs from 'dayjs';

export type GenerateDateRange = {
  startDate: number;
  endDate: number;
};

export function generateDateRange(option: DateRangeOption): GenerateDateRange {
  if (option === 'Арилгах') return { startDate: 0, endDate: 0 };

  let startDate = dayjs();
  let endDate = dayjs();

  const currentDateTime = dayjs();

  switch (option) {
    case 'Өнөөдөр':
      startDate = currentDateTime.startOf('day');
      endDate = currentDateTime.endOf('day');
      break;
    case 'Өчигдөр':
      startDate = currentDateTime.subtract(1, 'day').startOf('day');
      endDate = currentDateTime.subtract(1, 'day').endOf('day');
      break;
    case 'Уржигдар':
      startDate = currentDateTime.subtract(2, 'day').startOf('day');
      endDate = currentDateTime.subtract(2, 'day').endOf('day');
      break;
    case 'Энэ 7 хоног':
      startDate = currentDateTime.startOf('week');
      endDate = currentDateTime.endOf('week');
      break;
    case 'Өнгөрсөн 7 хоног':
      startDate = currentDateTime.subtract(1, 'week').startOf('week');
      endDate = currentDateTime.subtract(1, 'week').endOf('week');
      break;
    case 'Энэ сар':
      startDate = currentDateTime.startOf('month');
      endDate = currentDateTime.endOf('month');
      break;
    case 'Өнгөрсөн сар':
      startDate = currentDateTime.subtract(1, 'month').startOf('month');
      endDate = currentDateTime.subtract(1, 'month').endOf('month');
      break;
    case 'Энэ жил':
      startDate = currentDateTime.startOf('year');
      endDate = currentDateTime.endOf('year');
      break;
    case 'Өнгөрсөн жил':
      startDate = currentDateTime.subtract(1, 'year').startOf('year');
      endDate = currentDateTime.subtract(1, 'year').endOf('year');
      break;
    default:
      startDate = currentDateTime.startOf('day');
      endDate = currentDateTime.endOf('day');
      break;
  }

  return {
    startDate: +startDate.valueOf(),
    endDate: +endDate.valueOf(),
  };
}
