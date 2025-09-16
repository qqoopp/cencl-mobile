import ScreenBg from '@/components/blocks/bg/screenBg';
import React, {useEffect, useRef, useState} from 'react';
import {Header, PlayBtn, Prompter, ReadingBox, Thumbnail, TutorialContainer, TutorialImage, WidthButton, styles} from './style';
import {Image, Modal, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import Divider from '@/components/atoms/divider';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '@/navigations/rootStack';
import {useReadingTraining} from './useReadingTraining';
import NotoText from '@/components/atoms/text/notoText';
import Col from '@/components/blocks/view/col';
import {color, ftSizes, metrics} from '@/theme/theme';
import ProgressBar from '@/components/atoms/progressBar';
import EIcon from 'react-native-vector-icons/Entypo';
import OIcon from 'react-native-vector-icons/Octicons';
import {goBack} from '@/utils/rootNavigations';
import {tutorial_one, tutorial_second, tutorial_second_empty, waveGif} from '@/assets/img';
import Row from '@/components/blocks/view/row';
import VIcon from '@components/atoms/vIcon';
import FastImage from 'react-native-fast-image';
import NotchView from '@/components/blocks/view/notchView';
import LoadingView from '@/components/blocks/view/loadingView';
type Props = StackScreenProps<RootStackParams, 'readingTraining'>;

const ReadingTraining = ({
  navigation,
  route: {
    params: {rft},
  },
}: Props) => {
  const {
    nowReadingIndex,
    sentences,
    indexOfWords,
    modal,
    rftMode,
    ttsIndex,
    isTtsing,
    nonPassWordIndexList,
    isRecordFetching,
    readBookWithTTS,
    onPressSentence,
    onPressRftModeBtn,
    onRequestCloseModal,
    onPressQuitReadingButton,
    onPressGoBackBtn,
    recordingTimer,
  } = useReadingTraining(rft);
  const sentenctPositionRef = useRef<number[]>([]);
  const scrollRef = useRef<ScrollView>();

  useEffect(() => {
    if (rftMode === 'reading') {
      scrollRef.current?.scrollTo({y: sentenctPositionRef.current[nowReadingIndex], animated: true});
    } else if (rftMode === 'listening') {
      scrollRef.current?.scrollTo({y: sentenctPositionRef.current[ttsIndex], animated: true});
    }
  }, [nowReadingIndex, ttsIndex]);

  return (
    <>
      {isRecordFetching && <LoadingView text="학습데이터 저장중..." />}
      <ScreenBg>
        <Header>
          <TouchableOpacity>
            <OIcon name="x" size={24} color={color.black} onPress={onPressGoBackBtn} />
          </TouchableOpacity>
          {rftMode === 'reading' && (
            <>
              <ProgressBar width={metrics.screenWidth - 120} radius={10} percent={(nowReadingIndex / (sentences.length - 1)) * 100} />
              <TouchableOpacity onPress={() => onPressRftModeBtn('listening')}>
                <VIcon type="Feather" name="headphones" size={24} color={color.main} />
              </TouchableOpacity>
            </>
          )}
          {rftMode === 'listening' && (
            <>
              <ProgressBar width={metrics.screenWidth - 120} radius={10} percent={ttsIndex === -1 ? 0 : (ttsIndex / (sentences.length - 1)) * 100} />
              <TouchableOpacity onPress={() => onPressRftModeBtn('reading')}>
                <VIcon type="MaterialCommunityIcons" name="pause-circle-outline" size={24} color={color.main} />
              </TouchableOpacity>
            </>
          )}
          {/* {rftMode === 'recording' && (
            <>
              <NotoText>{new Date(studySeconds * 1000).toISOString().slice(14, 19)}</NotoText>
            </>
          )} */}
        </Header>
        <Divider h={1} />
        {rft.rft_text === '' ? (
          <Thumbnail source={{uri: rft.book_img_path}} />
        ) : (
          <ScrollView ref={scrollRef} decelerationRate={0.5} contentContainerStyle={styles.scrollView}>
            {sentences.map((sentence, index) => {
              return (
                <TouchableOpacity
                  key={sentence + index}
                  onLayout={e => {
                    sentenctPositionRef.current[index] = e.nativeEvent.layout.y;
                  }}
                  style={{marginBottom: 15}}
                  onPress={() => onPressSentence(index)}>
                  {rftMode === 'reading' && (
                    <Row style={{alignItems: 'flex-start'}}>
                      <NotoText ftColor={nowReadingIndex === index ? color.main : color.black} fs={ftSizes.m}>
                        {sentence}
                      </NotoText>
                    </Row>
                  )}
                  {rftMode === 'listening' && (
                    <Row style={{alignItems: 'flex-start'}}>
                      <VIcon size={20} type="Entypo" name="controller-play" color="#F2F2F2" />
                      <NotoText ml={10} ftColor={ttsIndex === index ? color.main : color.black} fs={ftSizes.m}>
                        {sentence}
                      </NotoText>
                    </Row>
                  )}
                  {rftMode === 'recording' && (
                    <Row style={{alignItems: 'flex-start'}}>
                      <NotoText ftColor={color.black} fs={ftSizes.m}>
                        {sentence}
                      </NotoText>
                    </Row>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        {/*----------------------------------- 읽기 하단 영역  -----------------------------------*/}
        {rftMode === 'reading' && (
          <ReadingBox>
            <Prompter>
              {Platform.OS === 'ios' ? (
                <NotoText fs={ftSizes.l}>
                  {sentences[nowReadingIndex]?.split(' ').map((word, index) => {
                    return (
                      <React.Fragment key={word + index}>
                        <NotoText
                          style={{textDecorationLine: nonPassWordIndexList.includes(index) ? 'underline' : 'none', textDecorationStyle: 'dashed'}}
                          ftColor={index < indexOfWords ? color.main : color.black}
                          fs={ftSizes.l}>
                          {word}
                        </NotoText>
                        <NotoText> </NotoText>
                      </React.Fragment>
                    );
                  })}
                </NotoText>
              ) : (
                <Row style={{flexWrap: 'wrap'}}>
                  {sentences[nowReadingIndex]?.split(' ').map((word, index) => {
                    return (
                      <Row key={word + index}>
                        <View
                          style={{
                            borderBottomColor: nonPassWordIndexList.includes(index) ? 'red' : 'transparent',
                            borderBottomWidth: 1,
                            borderStyle: 'dashed',
                          }}>
                          <NotoText ftColor={index < indexOfWords ? color.main : color.black} fs={ftSizes.l}>
                            {word}
                          </NotoText>
                        </View>
                        <NotoText> </NotoText>
                      </Row>
                    );
                  })}
                </Row>
              )}
              {/* </NotoText> */}
              <PlayBtn disabled={isTtsing} isTtsing={isTtsing} onPress={readBookWithTTS}>
                <NotoText mr={3} ftColor={color.white} fw="Medium">
                  문장듣기
                </NotoText>
                <EIcon name="controller-play" size={20} color={color.white} />
              </PlayBtn>
            </Prompter>
            <WidthButton onPress={() => onPressRftModeBtn('recording')}>
              <NotoText ftColor={color.white} fw="Bold">
                다음 단계로 넘어가기
              </NotoText>
            </WidthButton>
          </ReadingBox>
        )}
        {rftMode === 'recording' && (
          <ReadingBox>
            <Prompter>
              <NotoText fw="Bold" mt={10}>
                녹음이 진행되고 있습니다.
              </NotoText>
              <FastImage style={{width: metrics.singleWidth - 100, height: 50}} source={waveGif} resizeMode="contain" />
            </Prompter>
            <WidthButton disabled={isRecordFetching} onPress={onPressQuitReadingButton}>
              <NotoText ftColor={color.white} fw="Bold">
                읽기 유창성 연습 종료하기
              </NotoText>
            </WidthButton>
          </ReadingBox>
        )}
        {/*----------------------------------- 읽기 하단 영역  -----------------------------------*/}
      </ScreenBg>
      <NotchView />
      <Modal visible={modal.isVisible} onRequestClose={() => onRequestCloseModal(modal.type)}>
        {modal.type === 'firstTutorial' && (
          <TutorialContainer onPress={() => onRequestCloseModal(modal.type)}>
            <TutorialImage source={tutorial_one} resizeMode="contain" />
          </TutorialContainer>
        )}
        {modal.type === 'secondTutorail' && (
          <TutorialContainer onPress={() => onRequestCloseModal(modal.type)}>
            <TutorialImage source={rft.rft_text === '' ? tutorial_second_empty : tutorial_second} resizeMode="contain" />
          </TutorialContainer>
        )}
      </Modal>
    </>
  );
};

export default ReadingTraining;
