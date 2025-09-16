import React from 'react';
import {StyleSheet, View} from 'react-native';
import NotoText from '../atoms/text/notoText';
import {metrics} from '@/theme/theme';

const EmptyComponent = () => {
  return (
    <View style={styles.bg}>
      <NotoText>등록된 정보가 없습니다.</NotoText>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: metrics.screenWidth,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyComponent;
