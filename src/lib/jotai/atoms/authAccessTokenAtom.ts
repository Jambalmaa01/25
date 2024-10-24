import { atomWithStorage } from 'jotai/utils';

export const authAccessTokenAtom = atomWithStorage('access_token', '');
