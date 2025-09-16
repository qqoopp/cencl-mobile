import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';

export const useSound = (initialUrl?: string) => {
  const [url, setUrl] = useState(initialUrl ?? '');
  const [isPlaying, setIsPlaying] = useState(false);
  const {duration, position} = useProgress();
  const isFocused = useIsFocused();
  useEffect(() => {
    TrackPlayer.setVolume(1);

    return () => {
      TrackPlayer.pause();
    };
  }, [isFocused]);

  /**
   *
   * @param newUrl 재생시킬 url
   * @param isReset 같은 url때 처음부터 다시 재생시킬지 아님 스탑할지
   */
  const onPressPlayBtn = async (newUrl: string, isReset: boolean = false) => {
    console.log('will be playing url  : ', newUrl);
    try {
      if (url === newUrl && !isReset) {
        if (isPlaying) {
          TrackPlayer.pause();
          setIsPlaying(false);
        } else {
          TrackPlayer.play();
          setIsPlaying(true);
        }
      } else {
        await TrackPlayer.reset();
        await TrackPlayer.add({url: newUrl});
        await TrackPlayer.play();
        setIsPlaying(true);
      }
      setUrl(newUrl);
    } catch (error) {
      console.log('error is : ', error);
    }
  };

  const seekToPosition = (position: number) => {
    TrackPlayer.seekTo(position);
  };

  return {
    duration,
    position,
    isPlaying,
    onPressPlayBtn,
    seekToPosition,
  };
};
