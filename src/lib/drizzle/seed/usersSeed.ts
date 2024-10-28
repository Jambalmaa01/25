import { UserTableInsert } from '../schemas';
import { addedAt, adminId } from './vars';

export type UserSeed = Omit<UserTableInsert, 'id'> & { id: string };

export const usersSeed: UserSeed[] = [
  {
    id: 'ef006740-6d40-44f9-9505-6e549b8c2983',
    username: 'toumku',
    password: '$2a$10$nWBalfvME1/lzG5mxsbNZezqr5XqAdEIboxcxoBj7.eJfaznVVK8O',
    addedAt,
    roleId: adminId,
    employeeId: null,
  },
];
