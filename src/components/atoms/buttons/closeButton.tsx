import {button_close} from '@/assets/img';
import React from 'react';
import styled from 'styled-components/native';
import {marginProps} from '../../../../type';
import {ViewStyle} from 'react-native';
import SFXButton from './sfxButton';

interface CloseButton extends Props {}

const TouchButton = styled(SFXButton)`
  margin-right: ${({mr}: CloseButton) => (mr ? mr + 'px' : 0)};
  margin-left: ${({ml}: CloseButton) => (ml ? ml + 'px' : 0)};
  margin-top: ${({mt}: CloseButton) => (mt ? mt + 'px' : 0)};
  margin-bottom: ${({mb}: CloseButton) => (mb ? mb + 'px' : 0)};
`;

const ButtonImage = styled.Image`
  width: 40px;
  height: 32px;
`;

interface Props extends marginProps {
  onPress: () => void;
  style?: ViewStyle;
}

const CloseButton = ({onPress, ...props}: Props) => {
  return (
    <TouchButton onPress={onPress} {...props}>
      <ButtonImage source={button_close} />
    </TouchButton>
  );
};

export default CloseButton;
