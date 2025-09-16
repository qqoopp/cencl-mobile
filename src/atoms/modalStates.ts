import { modalType } from '@/types/common';
import { atom } from 'jotai';

export const initialModalStates: {
  isVisible: boolean;
  type: modalType;
  uri: string | null;
  winItem: item | null;
  shopItem: shopItem | null;
  alertButtons: {
    title: string;
    button: { title: string; onPress: () => void }[];
  } | null;
  onSuccessGate: () => void;
} = {
  isVisible: false,
  type: null,
  uri: null,
  winItem: null,
  shopItem: null,
  alertButtons: null,
  onSuccessGate: () => {},
};

// jotai에서는 key 불필요
const modalAtom = atom(initialModalStates);

export default modalAtom;