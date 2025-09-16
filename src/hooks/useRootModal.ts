import modalStates, {initialModalStates} from '@/atoms/modalStates';
import selectBookStates from '@/atoms/selectBookStates';
import {modalType} from '@/types/common';
import {useAtom, useSetAtom} from 'jotai';

export const useRootModal = () => {
  const setModal = useSetAtom(modalStates);
  const setSelectBook = useSetAtom(selectBookStates);

  const changeType = (type: modalType) => {
    setModal(prev => {
      return {...prev, type, isVisible: true};
    });
  };

  const close = () => {
    setModal({...initialModalStates, type: null, isVisible: false});
  };

  const setOnSuccessGate = (afterCloseFunc: () => void) => {
    setModal(prev => {
      return {...prev, onSuccessGate: afterCloseFunc};
    });
  };

  const openWebview = (uri: string) => {
    setModal(prev => {
      return {...prev, type: 'webView', uri, isVisible: true};
    });
  };

  const openAlert = (title: string, button: {title: string; onPress: () => void}[]) => {
    setModal(prev => {
      return {
        ...prev,
        type: 'alert',
        alertButtons: {
          title,
          button,
        },
      };
    });
  };

  const openCountDown = (onSuccessGate: () => void) => {
    setModal(prev => {
      return {
        ...prev,
        isVisible: true,
        type: 'countDown',
        onSuccessGate,
      };
    });
  };

  return {
    changeType,
    close,
    setOnSuccessGate,
    openWebview,
    openAlert,
    openCountDown,
  };
};
