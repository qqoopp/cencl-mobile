import {deviceDB} from '@/utils/deviceDB';
import { atom } from 'jotai';

export const initialUserStates: {
  isPremium: boolean;
  isFirstUser: boolean;
} = {
  isPremium: false,
  isFirstUser: false,
};

// Jotai에서는 key 필요 없음
const userAtom = atom(initialUserStates);

export default userAtom;
