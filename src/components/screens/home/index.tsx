import ClassCard from '@/components/atoms/card/classCard';
import NotoText from '@/components/atoms/text/notoText';
import Title from '@/components/atoms/text/title';
import Col from '@/components/blocks/view/col';
import Row from '@/components/blocks/view/row';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, ftSizes, metrics} from '@/theme/theme';
import React, {useEffect, useState} from 'react';
import {FlatList, Modal, ScrollView, Text, Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CategoryBtn, Day, Dot, EmptyDot, styles} from './style';
import {useHome} from './useHome';
import VIcon from '@/components/atoms/vIcon';
import Divider from '@/components/atoms/divider';
import Schedule from './components/schedule';
import EmptyComponent from '@/components/blocks/emptyComponent';
import {TutorialImage} from '../readingTraining/style';
import {tutorial_one} from '@/assets/img';
import {calcResponsive, widthPercentage} from '@/utils/responsiveSize';
import Rank from '@/components/modals/rank';

const days = ['일', '월', '화', '수', '목', '금', '토'];
const list = new Array(15).fill('-');

const Home = () => {
  const {
    modal,
    weeks,
    selectedDay,
    member,
    scheduleStatus,
    selectedCategory,
    onPressClassCard,
    onPressCategory,
    onPressCard,
    onPressArrow,
    onPressDay,
    handleHideToday,
  } = useHome();

  return (
    <>
      <ScreenBg style={styles.screenBg} isStatusBarUse>
        <Row mt={15}>
          <NotoText ml={20} fw="Bold" fs={ftSizes.m} ftColor={color.dark_gray}>
            안녕하세요.
          </NotoText>
          <Title>{member.mem_name}님</Title>
        </Row>
        <Row ml={20} mt={10}>
          {['학습현황', '수업일정'].map(category => {
            return (
              <CategoryBtn onPress={() => onPressCategory(category)} isSelected={selectedCategory === category} key={'category' + category}>
                <NotoText ftColor={selectedCategory === category ? color.main : color.black} fs={ftSizes.s} fw="Bold">
                  {category}
                </NotoText>
              </CategoryBtn>
            );
          })}
        </Row>
        <Divider />
        {selectedCategory === '학습현황' ? (
          <>
            <Row mt={24} style={{paddingLeft: 20}}>
              <NotoText mr={20} fs={ftSizes.l} fw="Medium">
                {weeks[selectedDay]?.split('-')[0]}년{weeks[selectedDay]?.split('-')[1]}월
              </NotoText>
            </Row>
            <Row mt={17} style={{paddingHorizontal: 20}}>
              <TouchableOpacity onPress={() => onPressArrow(-1)} style={{padding: 5}}>
                <Icon name="arrow-back-ios" size={25} color={color.black} />
              </TouchableOpacity>
              {weeks.map((fullDay, index) => {
                console.log('full');

                return (
                  <Col key={fullDay} style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                    <NotoText mb={8} fs={ftSizes.s} ftColor={color.dark_gray}>
                      {days[index]}
                    </NotoText>
                    <Day onPress={() => onPressDay(index)} isSelectedDay={selectedDay === index}>
                      <NotoText ftColor={selectedDay === index ? color.white : color.black} fs={calcResponsive(ftSizes.s)} fw="Bold">
                        {fullDay.split('-')[2]}
                      </NotoText>
                      {scheduleStatus[index] !== null ? <Dot isSelectedDay={selectedDay === index} /> : <EmptyDot />}
                    </Day>
                  </Col>
                );
              })}
              <TouchableOpacity onPress={() => onPressArrow(1)} style={{padding: 5}}>
                <Icon name="arrow-forward-ios" size={25} color={color.black} />
              </TouchableOpacity>
            </Row>
            <Divider h={1} mt={10} />
            {scheduleStatus[selectedDay] === null && <EmptyComponent />}

            <ScrollView contentContainerStyle={{paddingBottom: 120, padding: 20}}>
              {scheduleStatus[selectedDay]?.attend === '출석' && (
                <TouchableOpacity onPress={() => onPressClassCard('Reading')}>
                  <View style={{position: 'absolute', top: 0, left: -10, zIndex: 10}}>
                    <VIcon type="Ionicons" name="checkmark-circle-outline" size={25} color={color.main} />
                  </View>
                  <ClassCard type="class" title="[수업] Reading" />
                </TouchableOpacity>
              )}
              {scheduleStatus[selectedDay]?.attend_s === '출석' && (
                <TouchableOpacity onPress={() => onPressClassCard('Speaking')}>
                  <View style={{position: 'absolute', top: 0, left: -10, zIndex: 10}}>
                    <VIcon type="Ionicons" name="checkmark-circle-outline" size={25} color={color.main} />
                  </View>
                  <ClassCard type="class" title="[수업] Speaking" />
                </TouchableOpacity>
              )}
              {scheduleStatus[selectedDay]?.attend_w === '출석' && (
                <TouchableOpacity onPress={() => onPressClassCard('Writing')}>
                  <View style={{position: 'absolute', top: 0, left: -10, zIndex: 10}}>
                    <VIcon type="Ionicons" name="checkmark-circle-outline" size={25} color={color.main} />
                  </View>
                  <ClassCard type="class" title="[수업] Writing" />
                </TouchableOpacity>
              )}
              {/* {scheduleStatus[selectedDay]?.attend_v === '출석' && (
              <TouchableOpacity disabled>
                <View style={{position: 'absolute', top: 0, left: -10, zIndex: 10}}>
                  <VIcon type="Ionicons" name="checkmark-circle-outline" size={25} color={color.main} />
                </View>
                <ClassCard type="class" title="[수업] Voca" />
              </TouchableOpacity>
            )} */}
              {scheduleStatus[selectedDay]?.wordtest_is === '있음' && (
                <TouchableOpacity onPress={() => onPressCard('vocaTest')}>
                  <View style={{position: 'absolute', top: 0, left: -10, zIndex: 10}}>
                    <VIcon
                      type="Ionicons"
                      name="checkmark-circle-outline"
                      size={25}
                      color={scheduleStatus[selectedDay]?.status === '완료' ? color.main : color.dark_gray}
                    />
                  </View>
                  <ClassCard isTouchable type="test" title="[시험] 단어시험(IB)" />
                </TouchableOpacity>
              )}
              {scheduleStatus[selectedDay]?.rft_is === '있음' && (
                <TouchableOpacity onPress={() => onPressCard('rftList')}>
                  <View style={{position: 'absolute', top: 0, left: -10, zIndex: 10}}>
                    <VIcon
                      type="Ionicons"
                      name="checkmark-circle-outline"
                      size={25}
                      color={scheduleStatus[selectedDay]?.rft_seq_num !== '' ? color.main : color.dark_gray}
                    />
                  </View>
                  <ClassCard isTouchable type="homework" title="[숙제] 읽기 유창성 연습" />
                </TouchableOpacity>
              )}
            </ScrollView>
          </>
        ) : (
          <Schedule />
        )}
      </ScreenBg>
      {modal.type === 'rank' && member.menu_buse_rank === '사용' && (
        <>
          <Modal onRequestClose={modal.close} visible={modal.isVisible}>
            <View style={{backgroundColor: '#00000099', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{flex: 0.2, width: '90%'}}>
                {/* "오늘 하루 보지 않기" 버튼 추가 */}
                {/* <TouchableOpacity onPress={handleHideToday} style={{position: 'absolute', bottom: 8, right: 10}}>
                <Text style={{color: color.white, fontSize: 14}}>오늘 하루 보지 않기</Text>
              </TouchableOpacity> */}
              </View>
              <Rank closeMoal={modal.close} />
              <View style={{flex: 0.2}}></View>
            </View>
          </Modal>
        </>
      )}
    </>
  );
};

export default Home;
