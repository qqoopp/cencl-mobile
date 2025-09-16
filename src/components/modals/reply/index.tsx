import Divider from '@/components/atoms/divider';
import BottomInput from '@/components/atoms/inputs/bottomInput';
import NotoText from '@/components/atoms/text/notoText';
import VIcon from '@/components/atoms/vIcon';
import ModalBg from '@/components/blocks/bg/modalBg';
import Col from '@/components/blocks/view/col';
import {color, ftSizes, metrics} from '@/theme/theme';
import React, {useEffect} from 'react';
import {FlatList, Keyboard, KeyboardAvoidingView, Platform, View} from 'react-native';
import {CommentsBox, Header} from './style';
import {useReply} from './useReply';

interface Props {
  growthHistory: growthHistory;
  closeMoal: () => void;
}

const Reply = ({growthHistory, closeMoal}: Props) => {
  const {replies, keyboardHeight, onPressReplyBtn} = useReply(growthHistory);

  return (
    <ModalBg closeModal={closeMoal}>
      <Col>
        <CommentsBox>
          <Header>
            <VIcon type="Ionicons" name="chatbubble-sharp" size={22} color="#FFCE4A" />
            <NotoText ftColor={color.dark_gray} fs={ftSizes.xxs} ml={8}>
              댓글 {growthHistory.reply_cnt}
            </NotoText>
          </Header>
          <Divider h={1} />
          <FlatList
            data={replies}
            renderItem={({item, index}) => {
              return (
                <Col key={item.content_seq_num} ml={16} mt={15}>
                  <NotoText fw="Medium">{item.write_mem_name}</NotoText>
                  <NotoText fs={ftSizes.xxs} ftColor={color.dark_gray}>
                    {item.file_div}
                  </NotoText>
                  <NotoText>{item.content}</NotoText>
                </Col>
              );
            }}
          />
        </CommentsBox>
        <View style={{position: 'absolute', bottom: 0, transform: [{translateY: -keyboardHeight}]}}>
          <BottomInput onPressMsgArowBtn={onPressReplyBtn} />
        </View>
      </Col>
    </ModalBg>
  );
};

export default Reply;
