import NotoText from '@/components/atoms/text/notoText';
import Col from '@/components/blocks/view/col';
import Row from '@/components/blocks/view/row';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {RootStackParams} from '@/navigations/rootStack';
import {color, ftSizes, metrics} from '@/theme/theme';
import Slider from '@react-native-community/slider';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {PlayNavBox, PlayTimeRow, styles, Thumbnail} from './style';
import {useListeningTraining} from './useListeningTraining';

type Props = StackScreenProps<RootStackParams, 'listeningTraining'>;

const ListeningTraining = ({
  navigation,
  route: {
    params: {type, rft, reading, recordUri},
  },
}: Props) => {
  const {isPlaying, duration, position, onScrollPlayScroll, onPressArrowButton, onPressPlayBtn} = useListeningTraining({rft, type, recordUri});

  console.log('reading : ', reading);

  return (
    <ScreenBg style={styles.screen} isHeader headIconType="x">
      <Col style={{alignItems: 'center'}}>
        <NotoText mt={24} fw="Bold" mb={8} fs={ftSizes.l}>
          {type === 'recording' && rft?.book_title}
          {type === 'rft' && rft?.book_series}
          {type === 'sample' && reading?.book_title}
        </NotoText>
        <NotoText ftColor={color.black} fs={ftSizes.s}>
          {type === 'recording' && rft?.book_series}
          {type === 'rft' && rft?.book_series}
          {type === 'sample' && reading?.book_series}
        </NotoText>
      </Col>
      <Thumbnail source={{uri: type === 'sample' ? reading?.book_img_path : rft?.book_img_path}} resizeMode="contain" />
      <Col>
        <Slider
          maximumValue={duration}
          value={position}
          onSlidingComplete={onScrollPlayScroll}
          thumbTintColor={color.main}
          minimumTrackTintColor={color.main}
          maximumTrackTintColor={color.dark_gray}
          style={{width: metrics.tabletWidth}}
        />
        <PlayTimeRow>
          <NotoText ftColor={color.dark_gray}>{new Date(Math.floor(position) * 1000).toISOString().substring(14, 19)}</NotoText>
          <NotoText ftColor={color.dark_gray}>{new Date(Math.floor(duration) * 1000).toISOString().substring(14, 19)}</NotoText>
        </PlayTimeRow>
        <PlayNavBox>
          <TouchableOpacity onPress={() => onPressArrowButton(true)}>
            <Icon name="replay-5" color={color.main} size={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressPlayBtn} style={styles.playBtn}>
            <Icon name={isPlaying ? 'pause-circle-outline' : 'play-circle'} color={color.main} size={56} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onPressArrowButton(false)}>
            <Icon name="forward-5" color={color.main} size={40} />
          </TouchableOpacity>
        </PlayNavBox>
      </Col>
    </ScreenBg>
  );
};

export default ListeningTraining;
