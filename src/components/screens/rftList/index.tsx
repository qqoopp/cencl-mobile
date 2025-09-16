import NotoText from '@/components/atoms/text/notoText';
import Col from '@/components/blocks/view/col';
import Row from '@/components/blocks/view/row';
import HeaderView from '@/components/blocks/headerView';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, ftSizes, metrics} from '@/theme/theme';
import React from 'react';
import {FlatList, Image, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import IIcon from 'react-native-vector-icons/Ionicons';

import {RftBox, RftThumbnail, StudyButton, TextInfoBox, TrashButton} from './style';
import {useRftList} from './useRftList';
import {Divider} from 'react-native-flex-layout';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '@/navigations/rootStack';
import VIcon from '@/components/atoms/vIcon';
import {goBack} from '@/utils/rootNavigations';

export type rftListProps = StackScreenProps<RootStackParams, 'rftList'>;

const RftList = ({navigation, route: {params}}: rftListProps) => {
  const {rfts, onPressRecordRft, delRftList, onPressTrashBtn} = useRftList(params.date);

  return (
    <ScreenBg isStatusBarUse>
      <HeaderView bgColor="#FFFBE4">
        <Col mt={40} mb={40} style={{alignItems: 'center'}}>
          <Icon name="file-directory" color="#FFDD00" size={25} />
          <NotoText mt={16} fs={ftSizes.l} fw="Bold">
            읽기 유창성 연습
          </NotoText>
          <NotoText mt={8} mb={24} ftColor={color.dark_gray} fw="Bold">
            Reading Fluency Training
          </NotoText>
        </Col>
      </HeaderView>
      <FlatList
        data={rfts}
        renderItem={({item, index}) => {
          console.log('item : ', item);
          return (
            <>
              <Col>
                <RftBox>
                  <RftThumbnail source={{uri: item.book_img_path}} />
                  <TextInfoBox>
                    <NotoText fs={ftSizes.m} mb={8} fw="Bold">
                      {item.book_title}
                    </NotoText>
                    <NotoText mb={8} fw="Medium" ftColor={color.dark_gray}>
                      {item.book_author}
                    </NotoText>
                    {item.rft_read_time !== '' && (
                      <NotoText mb={8} fw="Medium">
                        읽기 정확도 {item.rft_read_accuracy}% | 학습 시간 {new Date(Number(item.rft_read_time) * 1000).toISOString().slice(14, 19)}
                      </NotoText>
                    )}

                    <Row>
                      <StudyButton onPress={() => navigation.navigate('listeningTraining', {rft: item, type: 'rft'})} type="listening">
                        <VIcon type="Feather" color={color.black} name="headphones" size={15} />
                        <NotoText fw="Medium" ml={3}>
                          듣기
                        </NotoText>
                      </StudyButton>
                      <StudyButton onPress={() => navigation.navigate('readingTraining', {rft: item})} type="reading">
                        <IIcon name="book" size={15} color={color.white} />
                        <NotoText fw="Medium" ml={3} ftColor={color.white}>
                          읽기
                        </NotoText>
                      </StudyButton>
                    </Row>
                  </TextInfoBox>
                </RftBox>
                <Divider w={metrics.singleWidth} />
              </Col>
              {item.rft_upload_audio_file !== null &&
                item.rft_upload_audio_file.map(file => {
                  //   console.log('upload file : ', file);
                  return (
                    <Col>
                      <RftBox>
                        <RftThumbnail source={{uri: item.book_img_path}} />
                        <TextInfoBox>
                          <TrashButton onPress={() => onPressTrashBtn(file.rft_audio_seq_num)}>
                            <VIcon type="FontAwesome" name="trash-o" size={15} />
                          </TrashButton>
                          <NotoText fs={ftSizes.m} mb={8} fw="Bold">
                            {item.book_title}
                          </NotoText>
                          <NotoText mb={8} fw="Medium" ftColor={color.gray}>
                            {item.book_author}
                          </NotoText>

                          <Row>
                            <StudyButton
                              onPress={() =>
                                navigation.navigate('listeningTraining', {rft: item, type: 'recording', recordUri: file.rft_upload_audio_path})
                              }
                              type="reading">
                              <VIcon type="Feather" color={color.white} name="headphones" size={15} />
                              <NotoText ftColor="white" fw="Medium" ml={3}>
                                녹음본 다시 듣기
                              </NotoText>
                            </StudyButton>
                          </Row>
                        </TextInfoBox>
                      </RftBox>
                      <Divider w={metrics.singleWidth} />
                    </Col>
                  );
                })}
            </>
          );
        }}
      />
    </ScreenBg>
  );
};

export default RftList;
