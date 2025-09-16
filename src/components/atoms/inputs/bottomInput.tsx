import {paper_airplane_purple} from '@/assets/icon';
import Col from '@/components/blocks/view/col';
import Row from '@/components/blocks/view/row';
import {useInput} from '@/hooks/useInput';
import {color, metrics} from '@/theme/theme';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, TextInput, View} from 'react-native';
import ImgBtn from '../btns/imgBtn';

interface Props {
  onPressMsgArowBtn: (txt: string) => void;
  isFocus?: boolean;
  placeholder?: string;
  abled?: boolean;
}

const BottomInput = ({onPressMsgArowBtn, placeholder = '', isFocus = false, abled = true}: Props) => {
  const input = useRef<TextInput | null>(null);
  const comment = useInput('');

  useEffect(() => {
    if (isFocus) {
      input.current?.focus();
    }
  }, [isFocus]);

  return (
    <Col
      style={{
        position: 'absolute',
        bottom: 0,
      }}>
      <Row
        style={{
          height: 56,
          width: metrics.screenWidth,

          backgroundColor: color.light_main,
          paddingHorizontal: 8,
        }}>
        <TextInput
          editable={abled}
          {...comment}
          ref={input}
          cursorColor={color.main}
          placeholderTextColor={color.dark_gray}
          placeholder={placeholder}
          style={{
            height: 40,
            flex: 1,
            backgroundColor: color.white,
            marginRight: 15,
            borderRadius: 10,
            paddingLeft: 10,
            color: color.black,
          }}
        />
        <ImgBtn
          disabled={!abled}
          onPress={() => {
            onPressMsgArowBtn(comment.value);
            comment.setValue('');
          }}
          src={paper_airplane_purple}
          imgStyle={{width: 30, height: 30}}
        />
      </Row>
    </Col>
  );
};

export default BottomInput;
