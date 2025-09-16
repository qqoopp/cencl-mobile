import React, {ReactNode} from 'react';
import {TouchableOpacityProps, ViewStyle} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import styled from 'styled-components/native';

interface Props extends TouchableOpacityProps {
  imgStyle: ImageStyle;
  onPress: () => void;
  btnStyle?: ViewStyle;
  src: number;
  // children: ReactNode;
}

const StyledBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const ImgBtn = ({
  src,
  onPress = () => {},
  btnStyle,
  imgStyle,
  children,
  ...props
}: Props) => {
  return (
    <StyledBtn style={{...btnStyle}} onPress={onPress} {...props}>
      <FastImage style={imgStyle} source={src} />
      {children}
    </StyledBtn>
  );
};

export default ImgBtn;
