import memberState from '@/states/memberState';
import React, {useEffect, useState} from 'react';
import {useAtomValue} from 'jotai';
import {useSound} from '@/hooks/useSound';
import SimpleToast from 'react-native-simple-toast';
import {goBack} from '@/utils/rootNavigations';
interface Return {
  isPlaying: boolean;
  duration: number;
  position: number;
  onScrollPlayScroll: (position: number) => void;
  onPressPlayBtn: () => void;
  onPressArrowButton: (isPrev: boolean) => void;
}

export const useListeningTraining = ({rft, type, recordUri}: {rft?: rft; type: 'rft' | 'recording' | 'sample'; recordUri?: string}): Return => {
  const {duration, position, isPlaying, onPressPlayBtn: onPlay, seekToPosition} = useSound();

  useEffect(() => {
    console.log('type : ', type);
    console.log('recordUri : ', recordUri);
    if (type === 'sample') {
      if (recordUri) onPlay(recordUri, false);
    } else {
      if (rft?.book_audio_path !== '' || type === 'recording') {
        console.log('음성 파일이 있거나 레코딩임');

        if (type === 'recording') {
          if (recordUri) onPlay(recordUri, false);
        } else {
          onPlay(rft?.book_audio_path ?? '', false);
        }
      } else {
        goBack();
        SimpleToast.show('해당 RFT는 듣기 학습을 제공하지 않습니다.');
      }
    }
  }, []);

  const onPressPlayBtn = () => {
    if (rft && type === 'rft') {
      onPlay(rft.book_audio_path, false);
    } else {
      onPlay(recordUri ?? '', false);
    }
  };

  const onScrollPlayScroll = (position: number) => seekToPosition(position);

  const onPressArrowButton = (isPrev: boolean) => {
    isPrev ? seekToPosition(position - 5) : seekToPosition(position + 5);
  };

  return {
    isPlaying,
    duration,
    position,
    onScrollPlayScroll,
    onPressPlayBtn,
    onPressArrowButton,
  };
};
