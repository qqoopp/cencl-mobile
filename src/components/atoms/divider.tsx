import {color, metrics} from '@/theme/theme';
import React from 'react';
import {ColorValue, View} from 'react-native';

interface Props {
  w?: number;
  h?: number;
  mt?: number;
  mb?: number;
  bg?: ColorValue;
}

const Divider = ({
  w = metrics.screenWidth,
  h = 8,
  mt = 0,
  mb = 0,
  bg = color.gray,
}: Props) => {
  return (
    <View
      style={{
        width: w,
        height: h,
        backgroundColor: bg,
        marginTop: mt,
        marginBottom: mb,
      }}
    />
  );
};

export default Divider;
