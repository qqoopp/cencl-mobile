import Col from '@/components/blocks/view/col';
import ScreenBg from '@/components/blocks/bg/screenBg';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  BodyView,
  Distractor,
  EngBox,
  PlayButton,
  PlayButtonSm,
  QuestionBox,
  ResultBox,
  styles,
  TestInfoBox,
  TestInfoCol,
  TimerBox,
  WordCard,
  WordPreviewCard,
} from './style';
import {useVocaTest} from './useVocaTest';
import Icon from 'react-native-vector-icons/Octicons';
import {color, ftSizes, metrics, shadow} from '@/theme/theme';
import NotoText from '@/components/atoms/text/notoText';
import Row from '@/components/blocks/view/row';
import RoundBoxBtn from '@/components/atoms/btns/roundBoxBts';
import EIcon from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Divider from '@/components/atoms/divider';
import HeaderView from '@/components/blocks/headerView';
import {RootStackParams} from '@/navigations/rootStack';
import {StackScreenProps} from '@react-navigation/stack';
import {navigate, replace} from '@/utils/rootNavigations';

type testInfoType = 'test_level' | 'test_week' | 'test_times' | 'test_type';
const testInfoCards: testInfoType[] = ['test_level', 'test_week', 'test_times', 'test_type'];
const infoTitle = {
  test_level: '레벨',
  test_week: '주차',
  test_times: '회차',
  test_type: '유형',
};

type Props = StackScreenProps<RootStackParams, 'vocaTest'>;

const VocaTest = ({
  navigation,
  route: {
    params: {date},
  },
}: Props) => {
  const {
    step,
    testInfo,
    seconds,
    answerSeqList,
    nowWord,
    wordStudy,
    nowTestIndex,
    distractors,
    userAnswers,
    nowAnswer,
    wrongAnswerIndexes,
    isRetest,
    retestIndex,
    totalSeconds,
    onPressCard,
    onPressNextStep,
    onPressPlayBtn,
    onPressDistractor,
    onPressNextTestBtn,
    onPressResultOkayBtn,
  } = useVocaTest(date);

  if (step === 'prev')
    return (
      <Info
        userAnswers={userAnswers}
        testInfo={testInfo}
        answerSeqList={answerSeqList}
        distractors={distractors}
        wrongAnswerIndexes={wrongAnswerIndexes}
        onPressNextStep={onPressNextStep}
        seconds={seconds}
        totalWordCount={wordStudy.length}
      />
    );
  else if (step === 'study')
    return (
      <Study wordStudy={wordStudy} nowWord={nowWord} onPressCard={onPressCard} onPressNextStep={onPressNextStep} onPressPlayBtn={onPressPlayBtn} />
    );
  else if (step === 'test')
    return (
      <Test
        seconds={seconds}
        nowTestIndex={nowTestIndex}
        distractors={distractors}
        userAnswers={userAnswers}
        nowAnswer={nowAnswer}
        isRetest={isRetest}
        retestIndex={retestIndex}
        wrongAnswerIndexes={wrongAnswerIndexes}
        onPressPlayBtn={onPressPlayBtn}
        onPressDistractor={onPressDistractor}
        onPressNextTestBtn={onPressNextTestBtn}
      />
    );
  else if (step === 'result')
    return (
      <Result
        totalSeconds={totalSeconds}
        userAnswers={userAnswers}
        wrongAnswerIndexes={wrongAnswerIndexes}
        answerSeqList={answerSeqList}
        distractors={distractors}
        onPressResultOkayBtn={onPressResultOkayBtn}
      />
    );
  return <View />;
};

export default VocaTest;

/**
 * 시험 정보 컴포넌트
 */

const Info = ({
  testInfo,
  answerSeqList,
  distractors,
  userAnswers,
  wrongAnswerIndexes,
  seconds,
  totalWordCount,
  onPressNextStep,
}: {
  userAnswers: string[];
  testInfo: getWordTest | null;
  answerSeqList: string[];
  distractors: studyWordTest[][];
  wrongAnswerIndexes: number[];
  seconds: number;
  totalWordCount: number;
  onPressNextStep: () => void;
}) => {
  //   console.log('testInfo : ', testInfo);
  console.log('correct amount : ', testInfo?.correct_amount);
  console.log('question_amount : ', testInfo?.question_amount);

  if (testInfo === null) return <View />;
  return (
    <ScreenBg isStatusBarUse>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderView bgColor={color.light_main}>
          <TestInfoCol>
            <Icon name="file-directory" color={color.main} size={25} />
            <NotoText mt={16} fs={ftSizes.l} fw="Bold">
              단어시험
            </NotoText>
            <NotoText mt={8} mb={24} ftColor={color.dark_gray} fw="Bold">
              Word Test
            </NotoText>
            <Row>
              {testInfoCards.map((_: 'test_level' | 'test_week' | 'test_times' | 'test_type', index) => {
                return (
                  <TestInfoBox key={_}>
                    <NotoText mb={3} fw="Bold" fs={ftSizes.m}>
                      {testInfo[_] ?? ''}
                    </NotoText>
                    <NotoText ftColor={color.dark_gray}>{infoTitle[_]}</NotoText>
                  </TestInfoBox>
                );
              })}
            </Row>
          </TestInfoCol>
        </HeaderView>
        {testInfo?.new_answer_student === null ? (
          <BodyView>
            <Col>
              <NotoText mb={10} fw="Bold" fs={ftSizes.m}>
                유의사항
              </NotoText>
              <NotoText>
                집에서 다시 연습하여 완벽하게 체화시키고자 합니다. 영어실력 향상을 위해 학부모님의 적극적인 관심으로 도와주시기 바랍니다.
              </NotoText>
            </Col>
          </BodyView>
        ) : (
          <>
            <Col style={{width: metrics.screenWidth, padding: 20}}>
              <NotoText fw="Bold" fs={ftSizes.m}>
                시험 결과
              </NotoText>
              <Row mt={16} style={{justifyContent: 'space-between'}}>
                <NotoText fw="Medium">맞힌 개수</NotoText>
                <NotoText ftColor={color.dark_gray}>
                  {testInfo?.correct_amount}/{totalWordCount}
                </NotoText>
              </Row>
              <Row mt={16} style={{justifyContent: 'space-between'}}>
                <NotoText fw="Medium">소요 시간</NotoText>
                <NotoText ftColor={color.dark_gray}>{new Date(seconds * 1000).toISOString().substring(14, 19)}</NotoText>
              </Row>
            </Col>
            <WrongAnswer userAnswers={userAnswers} answerSeqList={answerSeqList} distractors={distractors} wrongAnswerIndexes={wrongAnswerIndexes} />
          </>
        )}
      </ScrollView>
      {(testInfo.correct_amount === null || testInfo.correct_amount === '' || Number(testInfo.correct_amount) < totalWordCount) && (
        <View style={styles.resultOkayBtnView}>
          <RoundBoxBtn isLoading={distractors.length === 0} disabled={distractors.length === 0} onPress={onPressNextStep} title="시험 전 복습하기" />
        </View>
      )}
    </ScreenBg>
  );
};

const Study = ({
  wordStudy,
  nowWord,
  onPressNextStep,
  onPressCard,
  onPressPlayBtn,
}: {
  wordStudy: studyWordTest[];
  nowWord: studyWordTest | null;
  onPressNextStep: () => void;
  onPressCard: (word: studyWordTest) => void;
  onPressPlayBtn: (url: string, isReset: boolean) => void;
}) => {
  if (wordStudy.length === 0 || nowWord === null) return <View />;
  return (
    <ScreenBg isDivider style={styles.wordStudyScreen} isHeader headerTitle="시험 전 복습하기">
      <View style={styles.scrollViewBox}>
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} horizontal>
          {wordStudy.map(word => {
            const isSelected = nowWord === word;
            return (
              <TouchableOpacity style={{backgroundColor: 'white'}} key={'previewButton' + word.seq_num} onPress={() => onPressCard(word)}>
                <WordPreviewCard style={shadow.normal} isSelected={isSelected}>
                  <NotoText ftColor={isSelected ? color.white : color.black} fw="Bold">
                    {word.word}
                  </NotoText>
                </WordPreviewCard>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <WordCard style={shadow.normal}>
        <NotoText fs={ftSizes.xxxl} fw="Bold" mb={16}>
          {nowWord.word}
        </NotoText>
        <NotoText fs={ftSizes.m} mb={16}>
          {nowWord.meaning_kor}
        </NotoText>
        <NotoText fs={ftSizes.m} mb={16}>
          {nowWord.meaning_eng}
        </NotoText>
        <PlayButton onPress={() => onPressPlayBtn(nowWord.f_fullpath_0, true)}>
          <NotoText fw="Medium" fs={ftSizes.m} mr={5}>
            단어 발음 듣기
          </NotoText>
          <EIcon size={20} color={color.black} name="controller-play" />
        </PlayButton>
        <NotoText mt={40} mb={16}>
          {nowWord.example_eng}
        </NotoText>
        <PlayButton onPress={() => onPressPlayBtn(nowWord.f_fullpath_1, true)}>
          <NotoText fw="Medium" fs={ftSizes.m} mr={5}>
            예문 듣기
          </NotoText>
          <EIcon size={20} color={color.black} name="controller-play" />
        </PlayButton>
      </WordCard>
      <RoundBoxBtn onPress={onPressNextStep} mt={16} title="시험 보러 가기" />
    </ScreenBg>
  );
};

const Test = ({
  seconds,
  nowTestIndex,
  distractors,
  userAnswers,
  nowAnswer,
  isRetest,
  retestIndex,
  wrongAnswerIndexes,
  onPressPlayBtn,
  onPressDistractor,
  onPressNextTestBtn,
}: {
  seconds: number;
  nowTestIndex: number;
  distractors: studyWordTest[][];
  userAnswers: string[];
  nowAnswer: studyWordTest | null;
  isRetest: boolean;
  retestIndex: number;
  wrongAnswerIndexes: number[];
  onPressPlayBtn: (url: string, isReset: boolean) => void;
  onPressDistractor: (seq: string) => void;
  onPressNextTestBtn: (isRight: boolean) => void;
}) => {
  return (
    <ScreenBg
      isDivider
      style={styles.testScreen}
      titleColor={color.dark_gray}
      isHeader
      headerTitle={isRetest ? `${retestIndex + 1}/${wrongAnswerIndexes.length ?? 0}` : `${nowTestIndex + 1}/${distractors.length}`}>
      <TimerBox>
        <MIcon name="timer" size={25} color={color.main} />
        <NotoText ml={5} ftColor={color.main}>
          {new Date(seconds * 1000).toISOString().substring(15, 19)}
        </NotoText>
      </TimerBox>
      <Col mt={20} style={{flex: 1}}>
        <ScrollView>
          <NotoText fs={ftSizes.m} fw="Bold">
            주어진 단어의 올바른 뜻을 고르세요.
          </NotoText>
          <QuestionBox>
            <NotoText fw="Bold" fs={ftSizes.l} style={{textAlign: 'center'}}>
              {nowAnswer?.word}
            </NotoText>
            <NotoText mt={16} mb={8} fw="Bold">
              [예문]
            </NotoText>
            <NotoText mb={16}>{nowAnswer?.example_eng}</NotoText>
            <PlayButtonSm onPress={() => onPressPlayBtn(nowAnswer?.f_fullpath_1 ?? '', true)}>
              <NotoText fw="Medium" fs={ftSizes.xs} mr={5}>
                문장듣기
              </NotoText>
              <EIcon size={20} color={color.black} name="controller-play" />
            </PlayButtonSm>
          </QuestionBox>
          {distractors[nowTestIndex]?.map(distractor => {
            const isUserAnswer = distractor.seq_num.toString() === userAnswers[nowTestIndex];
            return (
              <Distractor
                isAnswer={isUserAnswer}
                onPress={() => onPressDistractor(distractor.seq_num.toString())}
                key={'distractor : ' + distractor.seq_num}>
                <NotoText ftColor={isUserAnswer ? color.white : color.black}>{distractor.meaning_eng}</NotoText>
              </Distractor>
            );
          })}
        </ScrollView>
      </Col>
      <Row>
        <RoundBoxBtn
          onPress={() => onPressNextTestBtn(false)}
          w={metrics.tabletWidth / 2 - 8}
          mr={16}
          mt={16}
          bgColor={color.dark_gray}
          titleColor={color.light_gray}
          title="이전 문제"
        />
        <RoundBoxBtn onPress={() => onPressNextTestBtn(true)} w={metrics.tabletWidth / 2 - 8} mt={16} bgColor={color.main} title="다음 문제" />
      </Row>
    </ScreenBg>
  );
};

const Result = ({
  totalSeconds,
  userAnswers,
  wrongAnswerIndexes,
  answerSeqList,
  distractors,
  onPressResultOkayBtn,
}: {
  totalSeconds: number;
  userAnswers: string[];
  wrongAnswerIndexes: number[];
  answerSeqList: string[];
  distractors: studyWordTest[][];
  onPressResultOkayBtn: () => void;
}) => {
  console.log('userAnswers : ', userAnswers);

  console.log('wrongAnswerIndexes : ', wrongAnswerIndexes.length);

  useEffect(() => {
    checkIsPerfect();
  }, []);

  const checkIsPerfect = () => {
    if (wrongAnswerIndexes.length === 0) {
      replace('testResultBoard', {score: '25/25', seconds: totalSeconds, type: 'voca'});
    }
  };

  return (
    <ScreenBg style={styles.resultScreen} isHeader={wrongAnswerIndexes.length !== 0} headerTitle="시험 결과">
      {wrongAnswerIndexes.length === 0 ? (
        <>
          <MCIcon name="medal-outline" color={color.main} size={100} />
          <NotoText fs={ftSizes.xl} fw="Bold" mt={24} mb={24}>
            대단해요!
          </NotoText>
          <NotoText fs={ftSizes.m} mb={48}>
            모두 다 맞았어요!
          </NotoText>
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ResultBox>
            <Col>
              <Row style={{width: '100%', justifyContent: 'space-between'}}>
                <NotoText fw="Medium" fs={ftSizes.s}>
                  맞힌 갯수
                </NotoText>
                <NotoText fw="Medium" fs={ftSizes.s} ftColor={color.dark_gray}>
                  {userAnswers.length - wrongAnswerIndexes.length}/{userAnswers.length}
                </NotoText>
              </Row>
              <Divider mb={10} mt={10} w={'100%'} h={1} />
              <Row style={{width: '100%', justifyContent: 'space-between'}}>
                <NotoText fs={ftSizes.s} fw="Medium">
                  소요 시간
                </NotoText>
                <NotoText fw="Medium" fs={ftSizes.s} ftColor={color.dark_gray}>
                  {new Date(totalSeconds * 1000).toISOString().substring(15, 19)}
                </NotoText>
              </Row>
            </Col>
          </ResultBox>

          <WrongAnswer userAnswers={userAnswers} answerSeqList={answerSeqList} distractors={distractors} wrongAnswerIndexes={wrongAnswerIndexes} />
        </ScrollView>
      )}
      <View style={styles.resultOkayBtnView}>
        <RoundBoxBtn onPress={onPressResultOkayBtn} title={wrongAnswerIndexes.length === 0 ? '확인' : '틀린문제 다시 풀기'} />
      </View>
    </ScreenBg>
  );
};

const WrongAnswer = ({
  userAnswers,
  answerSeqList,
  distractors,
  wrongAnswerIndexes,
}: {
  userAnswers: string[];
  answerSeqList: string[];
  distractors: studyWordTest[][];
  wrongAnswerIndexes: number[];
}) => {
  if (distractors.length === 0) return <ActivityIndicator style={{marginTop: 20}} />;
  return (
    <>
      {distractors.length > 0 &&
        wrongAnswerIndexes.map((wrongIndex, index) => {
          const answerSeq = answerSeqList[wrongIndex];
          let question: null | studyWordTest = null;
          let myAnswer: null | studyWordTest = null;
          distractors[wrongIndex].forEach(distractor => {
            if (distractor.seq_num.toString() === answerSeq) {
              question = distractor;
            }
            if (distractor.seq_num.toString() === userAnswers[wrongIndex]) {
              myAnswer = distractor;
            }
          });

          if (question === null || myAnswer === null) return <View />;
          else
            return (
              <Col key={wrongIndex + 'wrongAnswer' + index}>
                <NotoText ml={20} mb={8} mt={16}>
                  {wrongIndex + 1}번 문제
                </NotoText>
                {question !== null && (
                  <EngBox type="question">
                    <NotoText fw="Bold" fs={ftSizes.l} style={{textAlign: 'center'}}>
                      {question?.word}
                    </NotoText>
                    <NotoText mt={16} mb={8} fw="Bold">
                      [예문]
                    </NotoText>
                    <NotoText mb={16}>{question?.example_eng}</NotoText>
                  </EngBox>
                )}
                <NotoText ml={20} mb={8}>
                  내가 선택한 답
                </NotoText>
                <EngBox type="myAnswer">
                  <NotoText ftColor={color.white}>{myAnswer.meaning_eng}</NotoText>
                </EngBox>
                <NotoText ml={20} mb={8}>
                  정답
                </NotoText>
                <EngBox type="corretAnswer">
                  <NotoText ftColor={color.white}>{question.meaning_eng}</NotoText>
                </EngBox>
                <Divider />
              </Col>
            );
        })}
    </>
  );
};
