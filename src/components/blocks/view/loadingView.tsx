import NotoText from '@/components/atoms/text/notoText';
import {color, metrics} from '@/theme/theme';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingView = ({text}: {text: string}) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: metrics.screenWidth,
        height: metrics.screenHeight + metrics.statusBarHeight + metrics.notchBottom,
        top: 0,
        right: 0,
        backgroundColor: '#00000080',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={color.main} />
      <NotoText mt={10} ftColor={color.white}>
        {text}
      </NotoText>
    </View>
  );
};

export default LoadingView;
