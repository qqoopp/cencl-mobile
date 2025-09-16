import { atom } from 'jotai';

export const initialMemberDate = {
  isLoading: false,
};

// Jotai에서는 key 필요 없음
const memberLoadingAtom = atom(initialMemberDate);

export default memberLoadingAtom;