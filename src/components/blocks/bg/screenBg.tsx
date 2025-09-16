import React, {ReactNode} from 'react';
import {ColorSchemeName, ColorValue, TouchableOpacity} from 'react-native';
import {View, Text, ViewStyle, StatusBar, StatusBarStyle} from 'react-native';
import styled from 'styled-components/native';

import {goBack} from '@/utils/rootNavigations';
import {color, metrics} from '@/theme/theme';
import Divider from '../../atoms/divider';
import {IconButton} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OIcon from 'react-native-vector-icons/Octicons';

import {StyledTheme} from '@/../type';

interface ViewProps extends StyledTheme {
  style: ViewStyle;
}

const StyledView = styled.View`
  flex: 1;
  /* padding-top: ${StatusBar.currentHeight}; */
`;

const NavigationHeader = styled.View`
  height: 50px;
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 10px;
  align-items: center;
  top: ${(props: ViewProps) => props.theme.metrics.statusBarHeight + 'px'};
  width: ${(props: ViewProps) => props.theme.metrics.screenWidth + 'px'};
`;

const CancelBtn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-family: 'NotoSansKR-Medium';
  font-size: 16px;
  color: #222222;
`;

interface Props {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  statusBarBgColor?: ColorValue;
  barStyle?: StatusBarStyle;
  isHeader?: boolean;
  isHearRightBtn?: boolean;
  headerRightBtnText?: string;
  headerRightTextColor?: ColorValue;
  headIconType?: 'arrow' | 'x';
  headerTitle?: string;
  isStatusBarUse?: boolean;
  onPressRightBtn?: () => void;
  onPressLeftBtn?: () => void;
  isDivider?: boolean;
  titleColor?: string;
}

// const headIcon = {
//   arrow: arrow_bk,
//   x: x_black,
// };

const ScreenBg = ({
  children,
  headIconType = 'arrow',
  style,
  headerTitle,
  isHearRightBtn = false,
  headerRightTextColor = color.dark_gray,
  headerRightBtnText = '취소',
  onPressRightBtn = goBack,
  onPressLeftBtn = goBack,
  isStatusBarUse = false,
  statusBarBgColor = 'transparent',
  barStyle = 'dark-content',
  isHeader = false,
  isDivider = false,
  titleColor = '#000',
}: Props) => {
  const paddingTop = () => {
    if (isStatusBarUse) {
      return 0;
    } else {
      return isHeader ? metrics.statusBarHeight + 50 : metrics.statusBarHeight;
    }
  };

  return (
    <StyledView style={{backgroundColor: '#fff', paddingTop: paddingTop(), ...style}}>
      <StatusBar translucent backgroundColor={statusBarBgColor} barStyle={barStyle} />
      {isHeader && (
        <NavigationHeader>
          <IconButton
            onPress={onPressLeftBtn}
            style={{width: 32, height: 32}}
            icon={props => (headIconType === 'arrow' ? <Icon name="arrow-back-ios" {...props} /> : <OIcon name="x" {...props} size={32} />)}
          />
          {/* <ImgBtn
            src={headIcon[headIconType]}
            onPress={onArrowBtnPress}
            btnStyle={{width: 50, height: 50}}
            imgStyle={{width: 32, height: 32}}
          /> */}
          <Title style={{color: titleColor}}>{headerTitle}</Title>
          {isHearRightBtn ? (
            <CancelBtn onPress={onPressRightBtn}>
              <Text style={{color: headerRightTextColor}}>{headerRightBtnText}</Text>
            </CancelBtn>
          ) : (
            <CancelBtn disabled />
          )}
        </NavigationHeader>
      )}
      {isDivider && <Divider h={1} />}
      {children}
    </StyledView>
  );
};

export default ScreenBg;
