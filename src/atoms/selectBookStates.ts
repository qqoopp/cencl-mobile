import { atom } from 'jotai';

export const initialSelectBookStates: {
  selectedBook: null | readingStageDto;
  selectedBookStars: number;
  isReadable: boolean;
} = {
  selectedBook: null,
  selectedBookStars: 0,
  isReadable: false,
};

// Jotai에서는 key 필요 없음
const selectBookAtom = atom(initialSelectBookStates);

export default selectBookAtom;