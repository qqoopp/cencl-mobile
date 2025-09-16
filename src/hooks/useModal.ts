import {useEffect, useState} from 'react';

export interface ModalReturn<modalTypes> {
  isVisible: boolean;
  type: modalTypes;
  changeType: (type: modalTypes) => void;
  close: () => void;
}

export const useModal = <modalTypes>(): ModalReturn<modalTypes> => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState<modalTypes | null>(null);

  useEffect(() => {
    if (modalType === null) setIsVisible(false);
    if (modalType !== null) setIsVisible(true);
  }, [modalType]);

  const changeType = (type: modalTypes) => {
    setModalType(type);
  };

  const close = () => {
    setModalType(null);
  };

  return {isVisible, type: modalType, changeType, close};
};
