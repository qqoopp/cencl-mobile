import React, {ReactNode, useRef} from 'react';
import {GestureResponderEvent, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Sound from 'react-native-sound';

interface props extends TouchableOpacityProps {
  children: ReactNode;
}
const playSFX = async () => {
  Sound.setCategory('Playback');

  let whoosh = new Sound('touch_sound.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.error('failed to load the sound', error);
      return;
    }

    // Play the sound with an onEnd callback
    whoosh.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
  return whoosh;
};

const SFXButton = ({children, onPress, onPressIn, ...props}: props) => {
  const isPlaySFX = useRef(false);

  const _onPress = (e: GestureResponderEvent) => {
    if (onPress) {
      console.log('onPress : ', onPress);
      onPress(e);
    }
  };

  const _onPressIn = (e: GestureResponderEvent) => {
    if (isPlaySFX.current === false) {
      playSFX();
      isPlaySFX.current = true;
      setTimeout(() => {
        isPlaySFX.current = false;
      }, 500);
    }
    if (onPressIn) {
      onPressIn(e);
    }
  };

  return (
    <TouchableOpacity {...props} onPress={_onPress} onPressIn={_onPressIn}>
      {children}
    </TouchableOpacity>
  );
};

export default SFXButton;
