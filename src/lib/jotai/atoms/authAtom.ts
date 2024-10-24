import { EmployeeTable } from '@/lib/drizzle';
import { atom } from 'jotai';

export const authAtom = atom<EmployeeTable | null>(null);
