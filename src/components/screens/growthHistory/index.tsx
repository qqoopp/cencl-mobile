import Divider from '@/components/atoms/divider';
import NotoText from '@/components/atoms/text/notoText';
import SelectPeriodsBox from '@/components/blocks/selectPeriodsBox';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, ftSizes, metrics} from '@/theme/theme';
import React, {Suspense} from 'react';
import {FlatList, Modal, TouchableOpacity, Image, View, Text} from 'react-native';
import {BlindView, CommentButton, GrowthCard, GrowthRow, HistoryTypeView} from './style';
import {useGrowthHistory} from './useGrowthHistory';
import Slider from '@react-native-community/slider';
import VideoPlayer from 'react-native-video-player';
import Reply from '@/components/modals/reply';
import VIcon from '@/components/atoms/vIcon';
import EmptyComponent from '@/components/blocks/emptyComponent';
import {calcResponsive} from '@/utils/responsiveSize';

const GrowthHistory = () => {
  return (
    <Suspense fallback={<Text>fallback</Text>}>
      <GrowthHistoryComponent />
    </Suspense>
  );
};

const GrowthHistoryComponent = () => {
  const {
    growthHistories,
    playingContentIndex,
    duration,
    position,
    modal,
    selectedHistory,
    isPlaying,
    imgUri,
    onPressImg,
    onChangePeriods,
    onPressReplyBtn,
    onPressPlayContents,
    onPressPeriodChkBtn,
  } = useGrowthHistory();

  console.log('growthHis');
  console.log(growthHistories);

  return (
    <>
      <ScreenBg isHeader headerTitle="성장 과정" isDivider>
        <SelectPeriodsBox onChangePeriod={onChangePeriods} onPressChkBtn={onPressPeriodChkBtn} />

        <FlatList
          data={growthHistories}
          ListEmptyComponent={<EmptyComponent />}
          renderItem={({item: growthHistory, index}) => {
            // console.log('growthHistory [ ', growthHistory);

            const fileType = growthHistory.b_inputname.split('_')[2];
            // 0: 음성 | 1:영상 | 2:이미지   growthHistory.b_inputname
            return (
              <>
                <GrowthCard>
                  {growthHistory.contentType === '' && (
                    <BlindView>
                      <NotoText ftColor={color.white} fw="Medium">
                        해당 파일은 지원하지 않는 형식의 파일입니다.
                      </NotoText>
                    </BlindView>
                  )}
                  <GrowthRow>
                    <HistoryTypeView>
                      <NotoText fs={ftSizes.xxs} ftColor={color.dark_gray}>
                        {growthHistory.file_div}
                      </NotoText>
                    </HistoryTypeView>
                    <NotoText fs={ftSizes.xs} ftColor={color.dark_gray}>
                      {growthHistory.date}
                    </NotoText>
                  </GrowthRow>
                  {fileType === '0' ? (
                    <SoundContents
                      duration={duration}
                      isPlaying={isPlaying}
                      isSelectedTrack={index === playingContentIndex}
                      position={position}
                      growthHistory={growthHistory}
                      onPressContent={() => onPressPlayContents(growthHistory.f_fullpath, index, growthHistory.contentType)}
                    />
                  ) : fileType === '1' ? (
                    <VideoPlayer
                      video={{uri: growthHistory.f_fullpath}}
                      videoWidth={metrics.screenWidth}
                      videoHeight={250}
                      thumbnail={{uri: growthHistory.f_fullpath}}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => onPressImg(growthHistory.f_fullpath)}>
                      <Image
                        style={{width: metrics.singleWidth, height: calcResponsive(300)}}
                        resizeMode="contain"
                        source={{uri: growthHistory.f_fullpath}}
                      />
                    </TouchableOpacity>
                  )}

                  <GrowthRow>
                    <CommentButton onPress={() => onPressReplyBtn(growthHistory)}>
                      {growthHistory.reply_cnt === '0' ? (
                        <VIcon size={24} name="comment" type="EvilIcons" color={color.dark_gray} />
                      ) : (
                        <VIcon size={18} name="chatbubble-sharp" type="Ionicons" color="#FFCE4A" />
                      )}

                      <NotoText ml={5} ftColor={color.dark_gray}>
                        댓글쓰기
                      </NotoText>
                    </CommentButton>
                  </GrowthRow>
                </GrowthCard>
                <Divider />
              </>
            );
          }}
        />
      </ScreenBg>
      <Modal onRequestClose={modal.close} visible={modal.isVisible}>
        {modal.type === 'reply' && selectedHistory !== null && <Reply closeMoal={modal.close} growthHistory={selectedHistory} />}
        {modal.type === 'img' && (
          <View style={{backgroundColor: '#00000099', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={modal.close}
              style={{position: 'absolute', padding: 10, right: 10, top: metrics.statusBarHeight + 10, zIndex: 20}}>
              <VIcon type="Octicons" size={25} name="x" color="#fff" />
            </TouchableOpacity>
            <Image style={{width: metrics.screenWidth, height: calcResponsive(metrics.screenHeight)}} resizeMode="contain" source={{uri: imgUri}} />
          </View>
        )}
      </Modal>
    </>
  );
};

export default GrowthHistory;

const SoundContents = ({
  isPlaying,
  onPressContent,
  growthHistory,
  duration,
  position,
  isSelectedTrack,
}: {
  isPlaying: boolean;
  position: number;
  duration: number;
  growthHistory: growthHistory;
  isSelectedTrack: boolean;
  onPressContent: () => void;
}) => {
  //   console.log('----------------  sound Contents  -------------------');
  //   console.log('duration : ', duration);
  //   console.log('position : ', position);

  return (
    <GrowthRow>
      <NotoText ftColor={isSelectedTrack ? color.black : color.dark_gray}>
        {isPlaying && isSelectedTrack ? new Date(position * 1000).toISOString().slice(14, 19) : '00:00'}
      </NotoText>

      <TouchableOpacity onPress={onPressContent} style={{marginHorizontal: 10}}>
        {isSelectedTrack && isPlaying ? (
          <VIcon type="Ionicons" name="pause" color={color.black} size={18} />
        ) : (
          <VIcon type="Ionicons" name="play-sharp" color={color.black} size={18} />
        )}
      </TouchableOpacity>
      <Slider
        style={{flex: 1, marginRight: 20}}
        value={isSelectedTrack ? position : 0}
        maximumValue={duration}
        minimumTrackTintColor={color.main}
        maximumTrackTintColor={color.dark_gray}
        thumbTintColor={color.main}
      />
    </GrowthRow>
  );
};
