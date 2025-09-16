import {metrics, color} from '@/theme/theme';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const NotchView = ({bgColor = color.white}: {bgColor?: string}) => {
  const inset = useSafeAreaInsets();
  return <View style={{width: metrics.screenWidth, height: inset.bottom, backgroundColor: bgColor}} />;
};

export default NotchView;
