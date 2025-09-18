import ConfettiCannon from 'react-native-confetti-cannon';
import NotoText from '@/components/atoms/text/notoText';
import {ftSizes, metrics} from '@/theme/theme';
import Row from '@/components/blocks/view/row';
import ScreenBg from '@/components/blocks/bg/screenBg';
import HeaderBox from '@/components/blocks/headerBox';
import React, {ReactNode} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoLineDropDownPicker from '@/components/atoms/noLineDropDownPicker';
import {Button, Image, FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {useRank} from './useRank';
import {
  CategoryBox,
  CategoryBtn,
  CheckBtn,
  DateBtn,
  HistoryBox,
  RankCategoryBox,
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
import RankDivCategoryRow from '@/components/blocks/rankDivCategoryRow';
import RankCategoryRow from '@/components/blocks/rankCategoryRow';
import EmptyComponent from '@/components/blocks/emptyComponent';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '@/navigations/rootStack';
import {color} from '@/theme/theme';
import {getFullDateByCalcDaysAgo} from '@/utils/getFullDateByCalcDaysAgo';
import {navigate} from '@/utils/rootNavigations';
import VIcon from '@/components/atoms/vIcon';
import SimpleToast from 'react-native-simple-toast';
type rankCategory = '단어' | '독서량' | 'RFT';
const rankCategory: rankCategory[] = ['단어', '독서량', 'RFT'];
type rankDivCategory = '원내 랭킹' | '전국 랭킹';
const rankDivCategory: rankDivCategory[] = ['원내 랭킹', '전국 랭킹'];

// type Props = StackScreenProps<RootStackParams, 'rankHistory'>;

// const Rank = ({route: {params}}: Props) => {
interface Props {
  // ranks: rank[];
  closeMoal: () => void;
}

const getIconColor = (rank: number) => {
  switch (rank) {
    case 1:
      return '#B9F2FF'; // 다이아몬드
    case 2:
      return '#E5E4E2'; // 플래티넘
    case 3:
      return '#E0115F'; // 루비
    case 4:
      return '#FFD700'; // 금
    case 5:
      return '#C0C0C0'; // 은
    case 6:
      return '#CD7F32'; // 동
    case 7:
      return '#8C7853'; // 청동
    default:
      return '#B0C4DE'; // 기타 순위 (파란색 계열)
  }
};

const renderMedal = score => {
  if (score <= 3) {
    // 동메달을 score 갯수만큼 표시
    return Array(score)
      .fill(null)
      .map((_, index) => (
        <Icon key={index} name="trophy" size={15} color="#CD7F32" /> // 청동색 동그라미
      ));
  } else if (score === 4) {
    // 은메달 1개
    return <Icon name="trophy" size={15} color="#C0C0C0" />;
  } else if (score === 5) {
    // 은메달 2개
    return (
      <>
        <Icon name="trophy" size={15} color="#C0C0C0" />
        <Icon name="trophy" size={15} color="#C0C0C0" />
      </>
    );
  } else if (score === 6) {
    // 은메달 3개
    return (
      <>
        <Icon name="trophy" size={15} color="#C0C0C0" />
        <Icon name="trophy" size={15} color="#C0C0C0" />
        <Icon name="trophy" size={15} color="#C0C0C0" />
      </>
    );
  } else if (score === 7) {
    // 금메달
    return (
      <>
        <Icon name="trophy" size={15} color="#FFD700" />
      </>
    );
  } else if (score === 8) {
    // 금메달
    return (
      <>
        <Icon name="trophy" size={15} color="#FFD700" />
        <Icon name="trophy" size={15} color="#FFD700" />
      </>
    );
  } else if (score === 9) {
    // 금메달
    return (
      <>
        <Icon name="trophy" size={15} color="#FFD700" />
        <Icon name="trophy" size={15} color="#FFD700" />
        <Icon name="trophy" size={15} color="#FFD700" />
      </>
    );
  } else if (score === 10) {
    // 금메달
    return (
      <>
        <Icon name="trophy" size={15} color="#FFD700" />
        <Icon name="trophy" size={15} color="#FFD700" />
        <Icon name="trophy" size={15} color="#FFD700" />
        <Icon name="trophy" size={15} color="#FFD700" />
      </>
    );
  }
};

const Rank = ({closeMoal}: Props) => {
  const {
    histories,
    nowCategory,
    nowDivCategory,
    dropDownMonthList,
    onChangeSelect,
    onChangeCategory,
    onChangeDivCategory,
    onPressChkBtn,
    confettiData,
    isOverlayVisible,
    handleOverlayPress,
    isRank,
    myRankType,
    myRankNum,
  } = useRank(rankCategory[0], rankDivCategory[0], '1');

  // console.log('nowCategory : ', dropDownMonthList);

  // console.log('-------histories');

  // console.log(histories);

  return (
    <>
      <ScreenBg isStatusBarUse headerTitle="랭킹" style={{backgroundColor: '#E3E5F5', width: '90%', borderRadius: 20, overflow: 'hidden'}}>
        <TouchableOpacity onPress={closeMoal} style={{position: 'absolute', padding: 10, right: 10, zIndex: 20}}>
          <VIcon type="Octicons" size={25} name="x" color="#fff" />
        </TouchableOpacity>

        <HeaderBox second={<NoLineDropDownPicker bgColor="#E3E5F5" onChangeValue={onChangeSelect} itemList={dropDownMonthList} />} />
        <Divider h={1} w={'100%'} />

        <RankDivCategoryRow key="rankDivCategoryRow" onChangeDivCategory={onChangeDivCategory} initialType={rankDivCategory[0]} />
        <RankCategoryRow key="rankCategoryRow" onChangeCategory={onChangeCategory} initialType={rankCategory[0]} />
        <Divider h={1} w={'100%'} />

        <Row style={{width: '95%', alignSelf: 'center', marginTop: 12, marginBottom: 8}}>
          <NotoText fw="Bold" fs={ftSizes.m} style={{flex: 0.15, textAlign: 'center', color: 'gray'}}>
            순위
          </NotoText>
          <NotoText fw="Bold" fs={ftSizes.m} style={{flex: 0.3, textAlign: 'center', color: 'gray'}}>
            캠퍼스
          </NotoText>
          <NotoText fw="Bold" fs={ftSizes.m} style={{flex: 0.2, textAlign: 'center', color: 'gray'}}>
            학생
          </NotoText>
          <NotoText fw="Bold" fs={ftSizes.m} style={{flex: 0.2, textAlign: 'center', color: 'gray'}}>
            <></>
          </NotoText>
          <NotoText fw="Bold" fs={ftSizes.m} style={{flex: 0.2, textAlign: 'left', color: 'gray'}}>
            점수
          </NotoText>
        </Row>

        <Divider h={1} w={'100%'} />
        {nowCategory === '단어' && (
          <FlatList
            data={histories[0]}
            renderItem={({item, index}) => {
              return <WordHistoryBox history={item} key={item.rank} style />;
            }}
            ListEmptyComponent={<EmptyComponent />}
          />
        )}
        {nowCategory === '독서량' && (
          <FlatList
            data={histories[1]}
            renderItem={({item, index}) => {
              return <BookHistoryBox history={item} key={item.rank} />;
            }}
            ListEmptyComponent={<EmptyComponent />}
          />
        )}
        {nowCategory === 'RFT' && (
          <FlatList
            data={histories[2]}
            renderItem={({item, index}) => {
              return <RftHistoryBox history={item} key={item.rank} />;
            }}
            ListEmptyComponent={<EmptyComponent />}
          />
        )}
      </ScreenBg>

      {/* Congratulatory modal overlay */}
      {isOverlayVisible && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 200,
            width: '100%',
            height: '100%',
            backgroundColor: '#00000099',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleOverlayPress}>
          <View
            style={{
              //backgroundColor: 'rgba(255, 0, 0, 0.9)', // Semi-transparent background
              width: '80%',
              height: '25%',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <NotoText fw="Bold" fs={ftSizes.l} style={{color: 'white', textAlign: 'center'}}>
              축하합니다! 🎉
            </NotoText>
            <NotoText> </NotoText>
            <NotoText fw="Bold" fs={ftSizes.l} style={{color: 'white', textAlign: 'center'}}>
              {myRankType} 랭킹 {myRankNum}위에 들었습니다.
            </NotoText>
          </View>

          {confettiData.map(confetti => (
            <View
              key={confetti.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 300, // Higher than the modal
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ConfettiCannon count={confetti.count} origin={confetti.origin} fallSpeed={confetti.fallSpeed} fadeOut autoStart />
            </View>
          ))}
        </TouchableOpacity>
      )}
    </>
  );
};

/**
 *  Reading 학습 이력 조회
 */
const WordHistoryBox = ({history}: {history: rankCategory[0]}) => {
  return (
    <>
      <HistoryBox
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 15,
          marginVertical: 4,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 2,
          width: '95%',
          alignSelf: 'center',
          flex: 1,
        }}>
        <Row mt={10} style={{width: '100%', display: 'flex', flex: 1}}>
          <NotoText fw="Medium" fs={ftSizes.s} style={{flex: 0.14, textAlign: 'left', color: getIconColor(parseInt(history.rank))}}>
            {history.rank}위
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.3, textAlign: 'center'}}>
            {history.shop_name}
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.2, textAlign: 'center'}}>
            {history.mem_name}
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.21, textAlign: 'left'}}>
            {renderMedal(parseInt(history.prev_rank_cnt))}
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.2, textAlign: 'right'}}>
            {history.total_word_test_grade}
          </NotoText>
        </Row>
      </HistoryBox>
    </>
  );
};

/**
 *  Speaking 학습 이력 조회
 */
const BookHistoryBox = ({history}: {history: rankCategory[1]}) => {
  return (
    <>
      <HistoryBox
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 15,
          marginVertical: 4,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 2,
          width: '95%',
          alignSelf: 'center',
          flex: 1,
        }}>
        <Row mt={10} style={{width: '100%', display: 'flex', flex: 1}}>
          <NotoText fw="Medium" fs={ftSizes.s} style={{flex: 0.12, textAlign: 'left', color: getIconColor(parseInt(history.rank))}}>
            {history.rank}위
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xxs} style={{flex: 0.29, textAlign: 'center'}}>
            {history.shop_name}
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.17, textAlign: 'center'}}>
            {history.mem_name}
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.22, textAlign: 'left'}}>
            {renderMedal(parseInt(history.prev_rank_cnt))}
          </NotoText>
          <View style={{flex: 0.28, alignSelf: 'center'}}>
            <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 1, textAlign: 'right'}}>
              {history.sum_book_cbc_total}
            </NotoText>
            <NotoText fw="Light" fs={ftSizes.xxxs} style={{flex: 1, textAlign: 'right'}}>
              {history.total_per}
            </NotoText>
          </View>
        </Row>
      </HistoryBox>
    </>
  );
};

const RftHistoryBox = ({history}: {history: rft}) => {
  return (
    <>
      <HistoryBox
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 15,
          marginVertical: 4,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 2,
          width: '95%',
          alignSelf: 'center',
          flex: 1,
        }}>
        <Row mt={10} style={{width: '100%', display: 'flex', flex: 1}}>
          <NotoText fw="Medium" fs={ftSizes.s} style={{flex: 0.14, textAlign: 'left', color: getIconColor(parseInt(history.rank))}}>
            {history.rank}위
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.3, textAlign: 'center'}}>
            {history.shop_name}
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.2, textAlign: 'center'}}>
            {history.mem_name}
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.21, textAlign: 'left'}}>
            {renderMedal(parseInt(history.prev_rank_cnt))}
          </NotoText>
          <NotoText fw="Light" fs={ftSizes.xs} style={{flex: 0.2, textAlign: 'right'}}>
            {history.rft_point}
          </NotoText>
        </Row>
      </HistoryBox>
    </>
  );
};

export default Rank;

const HistoryValueTxt = ({children}: {children: ReactNode}) => {
  return (
    <ValueTxt ellipsizeMode="tail" numberOfLines={1}>
      {children}
    </ValueTxt>
  );
};
