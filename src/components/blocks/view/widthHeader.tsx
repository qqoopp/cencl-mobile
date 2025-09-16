import BackButton from '@/components/atoms/buttons/backButton';
import CloseButton from '@/components/atoms/buttons/closeButton';
import OneText from '@/components/atoms/texts/oneText';
import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import NotchView from './notchView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyledTheme} from '../../../../type';
import Row from './row';
import {ViewStyle, View} from 'react-native';
import {goBack} from '@/navigations/rootNavigations';
import Box from '@/components/atoms/box';

interface HeaderStyledProps extends StyledTheme {
  bgColor: string;
}

const HeaderStyled = styled.View`
  /* width: 100%; */
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #ddddf3;
  background-color: ${({theme: {color}, bgColor}: HeaderStyledProps) => bgColor ?? color.white};
`;

const Divider = styled.View`
  height: 1px;
  background-color: #ddddf3;
`;

interface Props {
  backBtn?: boolean;
  backBtnTitle?: string;
  closeButton?: boolean;
  onPressCloseButton?: () => void;
  onPressBackButton?: () => void;

  children?: ReactNode;
  isEmptyLeftNotch?: boolean;
  isDividerHave?: boolean;
  bgColor?: string;
  justifyContent?: string;
}

const WidthHeader = ({
  backBtn,
  backBtnTitle,
  closeButton,
  children,
  onPressCloseButton = () => console.log('_'),
  onPressBackButton = goBack,
  isEmptyLeftNotch = false,
  isDividerHave = true,
  bgColor = '#fff',
  justifyContent = 'space-between',
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <HeaderStyled bgColor={bgColor} style={{paddingLeft: 0}}>
        {/* <NotchView position="left" /> */}
        {backBtn && (
          <Box row>
            <BackButton onPress={onPressBackButton} mr={12} />
            <OneText fm="title" fs={16}>
              {backBtnTitle ?? ''}
            </OneText>
          </Box>
        )}
        {children}
        {closeButton && (
          <>
            <CloseButton onPress={onPressCloseButton} />
          </>
        )}
      </HeaderStyled>
      {isDividerHave && <Divider />}
    </>
  );
};

export default WidthHeader;
