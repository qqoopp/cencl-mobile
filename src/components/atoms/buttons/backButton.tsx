import {button_back, button_pause} from '@/assets/img';
import React from 'react';
import styled from 'styled-components/native';
import {marginProps} from '../../../../type';
import {goBack} from '@/navigations/rootNavigations';
import SFXButton from './sfxButton';
import {navigationRef} from '@/utils/rootNavigations';

interface ButtonProps extends Props {}

const TouchButton = styled(SFXButton)`
  margin-right: ${({mr}: ButtonProps) => (mr ? mr + 'px' : 0)};
  margin-left: ${({ml}: ButtonProps) => (ml ? ml + 'px' : 0)};
  margin-top: ${({mt}: ButtonProps) => (mt ? mt + 'px' : 0)};
  margin-bottom: ${({mb}: ButtonProps) => (mb ? mb + 'px' : 0)};
  z-index: 1;
`;

const ButtonImage = styled.Image`
  width: 40px;
  height: 32px;
`;

interface Props extends marginProps {
  onPress?: () => void;
  type?: 'back' | 'pause';
}

const ButtonImgs = {
  back: button_back,
  pause: button_pause,
};

const BackButton = ({onPress = goBack, type = 'back', ...props}: Props) => {
  return (
    <TouchButton
      onPress={() => {
        navigationRef.goBack();
      }}
      {...props}>
      <ButtonImage source={ButtonImgs[type]} />
    </TouchButton>
  );
};

export default BackButton;
