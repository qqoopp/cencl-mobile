import NotoText from '@/components/atoms/text/notoText';
import Row from '@/components/blocks/view/row';
import ScreenBg from '@/components/blocks/bg/screenBg';
import React, {ReactNode} from 'react';
import {Button, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {useLearningHistory} from './useLearningHistory';
import {
  CategoryBox,
  CategoryBtn,
  CheckBtn,
  DateBtn,
  HistoryBox,
  LearningCategoryBox,
  SampleListeningButton,
  TextInfoBox,
  Thumbnail,
  Title,
  ValueTxt,
  VocaStatusCard,
} from './style';
import Divider from '@/components/atoms/divider';
import Col from '@/components/blocks/view/col';
import SelectPeriodsBox from '@/components/blocks/selectPeriodsBox';
import LearningCategoryRow from '@/components/blocks/learningCategoryRow';
import EmptyComponent from '@/components/blocks/emptyComponent';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '@/navigations/rootStack';
import {color} from '@/theme/theme';
import {getFullDateByCalcDaysAgo} from '@/utils/getFullDateByCalcDaysAgo';
import {navigate} from '@/utils/rootNavigations';
import VIcon from '@/components/atoms/vIcon';
import SimpleToast from 'react-native-simple-toast';
type learningCategory = 'Reading' | 'Speaking' | 'Writing' | '읽기유창성연습' | 'Voca';
const learningCategory: learningCategory[] = ['Reading', 'Speaking', 'Writing', '읽기유창성연습'];

type Props = StackScreenProps<RootStackParams, 'learningHistory'>;

const LearningHistory = ({navigation, route: {params}}: Props) => {
  const {histories, nowCategory, onChangePeriod, onChangeCategory, onPressChkBtn} = useLearningHistory(params?.category);

  console.log('nowCategory : ', nowCategory);

  console.log('-------histories');

  console.log(histories);

  return (
    <>
      <ScreenBg isHeader headerTitle="학습 이력 조회" isDivider>
        <SelectPeriodsBox onPressChkBtn={onPressChkBtn} onChangePeriod={onChangePeriod} />
        <Divider h={1} />
        <LearningCategoryRow type="learningHistory" onChangeCategory={onChangeCategory} initialType={params?.category} />

        <Divider />
        {nowCategory === 'Reading' && (
          <FlatList
            data={histories[0]}
            renderItem={({item, index}) => {
              return <ReadingHistoryBox history={item} key={item.book_cbn} />;
            }}
            ListEmptyComponent={<EmptyComponent />}
          />
        )}
        {nowCategory === 'Speaking' && (
          <FlatList
            data={histories[1]}
            renderItem={({item, index}) => {
              return <SpeakingHistoryBox history={item} key={item.book_cbn_s} />;
            }}
            ListEmptyComponent={<EmptyComponent />}
          />
        )}
        {nowCategory === 'Writing' && (
          <FlatList
            data={histories[2]}
            renderItem={({item, index}) => {
              return <WritingHistoryBox history={item} key={item.book_cbn_w} />;
            }}
            ListEmptyComponent={<EmptyComponent />}
          />
        )}
        {nowCategory === '읽기유창성연습' && (
          <FlatList
            data={histories[3]}
            renderItem={({item, index}) => {
              return <RftHistoryBox history={item} key={item.book_cbn} />;
            }}
            ListEmptyComponent={<EmptyComponent />}
          />
        )}
        {nowCategory === 'Voca' && (
          <FlatList
            data={histories[4]}
            renderItem={({item, index}) => {
              return <VocaHistoryBox voca={item} />;
            }}
            ListEmptyComponent={<EmptyComponent />}
          />
        )}
      </ScreenBg>
    </>
  );
};

/**
 *  Reading 학습 이력 조회
 */
const ReadingHistoryBox = ({history}: {history: reading}) => {
  console.log('reading history : ', history);

  return (
    <>
      <HistoryBox>
        <Thumbnail
          source={{
            uri: history.book_img_path,
          }}
        />
        <TextInfoBox>
          <Row mt={10}>
            <Title>수업일</Title>
            <NotoText>{history.date}</NotoText>
          </Row>
          <Row mt={10}>
            <Title>CBN</Title>
            <HistoryValueTxt>{history.book_cbn}</HistoryValueTxt>
            <Title>리딩</Title>
            <HistoryValueTxt>{history.reading_R}</HistoryValueTxt>
          </Row>
          <Row mt={10}>
            <Title>노트</Title>
            <HistoryValueTxt>{history.reading_N}</HistoryValueTxt>
            <Title>숙제</Title>
            <HistoryValueTxt>{history.H}</HistoryValueTxt>
          </Row>
          <Row mt={10}>
            <Title>AR</Title>
            <HistoryValueTxt>{history.reading_AR}</HistoryValueTxt>
          </Row>
          {history.book_audio_path !== '' && (
            <SampleListeningButton
              onPress={() => navigate('listeningTraining', {type: 'sample', recordUri: history.book_audio_path, reading: history})}>
              <VIcon type="Feather" color={color.white} name="headphones" size={15} />
              <NotoText ml={4} fw="Medium" ftColor={color.white}>
                샘플 음원 듣기
              </NotoText>
            </SampleListeningButton>
          )}
        </TextInfoBox>
      </HistoryBox>
      <Divider />
    </>
  );
};

/**
 *  Speaking 학습 이력 조회
 */
const SpeakingHistoryBox = ({history}: {history: speaking}) => {
  return (
    <>
      <HistoryBox>
        <Thumbnail
          source={{
            uri: history.book_img_path,
          }}
        />
        <TextInfoBox>
          <Row mt={10}>
            <Title>수업일</Title>
            <NotoText>{history.date}</NotoText>
          </Row>
          <Row mt={10}>
            <Title>시리즈</Title>
            <HistoryValueTxt>{history.book_series_s}</HistoryValueTxt>
            <Title>제목</Title>
            <HistoryValueTxt>{history.book_title_s}</HistoryValueTxt>
          </Row>
          <Row mt={10}>
            <Title>발음</Title>
            <HistoryValueTxt>{history.speaking_pronunciation}</HistoryValueTxt>
            <Title>RFT</Title>
            <HistoryValueTxt>{history.speaking_RFT}</HistoryValueTxt>
          </Row>
          <Row mt={10}>
            <Title>책읽기</Title>
            <HistoryValueTxt>{history.speaking_booktalking}</HistoryValueTxt>
            <Title>LEVEL</Title>
            <HistoryValueTxt>{history.speaking_level}</HistoryValueTxt>
          </Row>
          <Row mt={10}>
            <Title>Speaking</Title>
            <HistoryValueTxt>{history.speaking_S}</HistoryValueTxt>
            <Title>숙제(s)</Title>
            <HistoryValueTxt>{history.speaking_homework}</HistoryValueTxt>
          </Row>
        </TextInfoBox>
      </HistoryBox>
      <Divider />
    </>
  );
};

/**
 *  Writing 학습 이력 조회
 */
const WritingHistoryBox = ({history}: {history: writing}) => {
  return (
    <>
      <HistoryBox>
        <Thumbnail
          source={{
            uri: history.book_img_path,
          }}
        />
        <TextInfoBox>
          <Row mt={10}>
            <Title>수업일</Title>
            <NotoText>{history.date}</NotoText>
          </Row>
          <Row mt={10}>
            <Title>시리즈</Title>
            <HistoryValueTxt>{history.book_series_w}</HistoryValueTxt>
            <Title>제목</Title>
            <HistoryValueTxt>{history.book_title_w}</HistoryValueTxt>
          </Row>
          <Row mt={10}>
            <Title>이해도</Title>
            <HistoryValueTxt>{history.writing_understanding}</HistoryValueTxt>
            <Title>구성도</Title>
            <HistoryValueTxt>{history.writing_structure}</HistoryValueTxt>
          </Row>
          <Row mt={10}>
            <Title>문법</Title>
            <HistoryValueTxt>{history.writing_grammar}</HistoryValueTxt>
            <Title>LEVEL</Title>
            <HistoryValueTxt>{history.writing_level}</HistoryValueTxt>
          </Row>
          <Row mt={10}>
            <Title>Writing</Title>
            <HistoryValueTxt>{history.writing_W}</HistoryValueTxt>
            <Title>숙제(w)</Title>
            <HistoryValueTxt>{history.writing_homework}</HistoryValueTxt>
          </Row>
        </TextInfoBox>
      </HistoryBox>
      <Divider />
    </>
  );
};

const RftHistoryBox = ({history}: {history: rft}) => {
  console.log('rft history : ', history);
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('rftList', {
          date: history.date,
        })
      }>
      <HistoryBox>
        <Thumbnail source={{uri: history.book_img_path}} />
        <TextInfoBox>
          <Row mt={10}>
            <Title>수업일</Title>
            <NotoText>{history.date}</NotoText>
          </Row>
          <Row mt={10}>
            <Title>cbn</Title>
            <HistoryValueTxt>{history.book_cbn}</HistoryValueTxt>
            <Title>제목</Title>
            <HistoryValueTxt>{history.book_title}</HistoryValueTxt>
          </Row>
        </TextInfoBox>
      </HistoryBox>
      <Divider />
    </TouchableOpacity>
  );
};

/**
 *  Voca 학습 이력 조회
 */
const VocaHistoryBox = ({voca}: {voca: getWordTest}) => {
  //   console.log('voca', voca);

  //   console.log('voca start date : ', voca.date_start);
  //   console.log('today date : ', getFullDateByCalcDaysAgo(0));

  const startDate = new Date(voca.date_start);
  const today = new Date(getFullDateByCalcDaysAgo(0));

  const isDone = voca.test_type === 'PB' ? true : startDate < today;

  return (
    <TouchableOpacity
      onPress={() => {
        voca.test_type === 'PB' ? SimpleToast.show('IB시험만 열람 가능합니다') : navigate('vocaTest', {date: voca.date_start});
      }}>
      <HistoryBox>
        <TextInfoBox>
          <Row mt={10} style={{justifyContent: 'space-between'}}>
            <Row>
              <Title>시험일</Title>
              <NotoText>{voca.date_end}</NotoText>
            </Row>
            <VocaStatusCard isDone={isDone}>
              <NotoText ftColor={color.white}>{isDone ? '완료' : '진행중'}</NotoText>
            </VocaStatusCard>
          </Row>
          <Row mt={10}>
            <Title>레벨</Title>
            <HistoryValueTxt>{voca.test_level}</HistoryValueTxt>
            <Title>유형</Title>
            <HistoryValueTxt>{voca.test_type}</HistoryValueTxt>
          </Row>
          <Row mt={10}>
            <Title>주차</Title>
            <HistoryValueTxt>{voca.test_week}</HistoryValueTxt>
            <Title>회차</Title>
            <HistoryValueTxt>{voca.test_times}</HistoryValueTxt>
            <Title>점수</Title>
            <HistoryValueTxt>{voca.grade}</HistoryValueTxt>
          </Row>
        </TextInfoBox>
      </HistoryBox>
      <Divider />
    </TouchableOpacity>
  );
};

export default LearningHistory;

const HistoryValueTxt = ({children}: {children: ReactNode}) => {
  return (
    <ValueTxt ellipsizeMode="tail" numberOfLines={1}>
      {children}
    </ValueTxt>
  );
};
