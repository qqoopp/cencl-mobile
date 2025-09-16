import Sound from 'react-native-sound';

export const playSoundEffect = () => {
  Sound.setCategory('Playback');

  const audio = new Sound('fanfare.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // if loaded successfully
    audio.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
};
