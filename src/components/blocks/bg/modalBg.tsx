import {StyledTheme} from '@/../type';
import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
interface StyledModalBg extends StyledTheme {
  align: 'bottom' | 'center';
}

const StyledModalBg = styled.Pressable`
  flex: 1;
  background-color: #00000050;
  display: flex;
  justify-content: ${({align}: StyledModalBg) => (align === 'bottom' ? 'flex-end' : 'center')};
  align-items: center;
`;

interface Props {
  closeModal: () => void;
  children: ReactNode;
  align?: 'bottom' | 'center';
}

const ModalBg = ({closeModal, children, align = 'bottom'}: Props) => {
  return (
    <StyledModalBg align={align ?? 'bottom'} onPress={closeModal}>
      {children}
    </StyledModalBg>
  );
};

export default ModalBg;
