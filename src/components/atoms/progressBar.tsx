import {StyledTheme} from '@/../type';
import React from 'react';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';

interface BarStyle extends StyledTheme, Props {}

const StyledBar = styled.View`
  width: ${({width}: BarStyle) => (width ? width + 'px' : '100px')};
  height: ${({height}: BarStyle) => (height ? height + 'px' : '5px')};
  background-color: ${({barColor, theme}: BarStyle) => barColor ?? theme.color.gray};
  border-radius: ${({radius}: BarStyle) => (radius ? radius + 'px' : '0px')};
  overflow: hidden;
`;
const GaugeBar = styled.View`
  width: ${({percent}: BarStyle) => percent + '%'};
  height: ${({height}: BarStyle) => (height ? height + 'px' : '5px')};
  background-color: ${({gaugeColor, theme}: BarStyle) => gaugeColor ?? theme.color.main};
`;

interface Props {
  style?: ViewStyle;
  width: number | string;
  percent: number;
  height?: number;
  barColor?: number;
  gaugeColor?: number;
  radius?: number;
}

const ProgressBar = (props: Props) => {
  return (
    <StyledBar {...props}>
      <GaugeBar {...props} />
    </StyledBar>
  );
};

export default ProgressBar;
