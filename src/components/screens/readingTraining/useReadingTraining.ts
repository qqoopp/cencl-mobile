import {useEffect, useRef, useState} from 'react';
import {Platform, PermissionsAndroid, Alert, BackHandler} from 'react-native';
import Tts from 'react-native-tts';
import stringSimilarity from 'string-similarity';
import Voice, {SpeechErrorEvent, SpeechResultsEvent} from '@react-native-voice/voice';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AVModeIOSOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {delSpecialChar} from '@/utils/regExp';
import {useModal} from '@/hooks/useModal';
import {useSoundMode} from '@/hooks/useSoundMode';
import {goBack, replace} from '@/utils/rootNavigations';
import {writeRftFetch} from '@/api/rft';
import {useAtomValue} from 'jotai';
import memberState from '@/states/memberState';
import {metaphone} from 'metaphone';
import Leven from 'damerau-levenshtein';
import SimpleToast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-blob-util';

const audioRecorderPlayer = new AudioRecorderPlayer();

const requestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
      } else {
        return;
      }
    } catch (err) {
      return;
    }
  }
};

const makeNgram = (readingText: string, startIndex: number, ngramLength: number): string[] => {
  let readingTextArr = delSpecialChar(readingText).split(' '); //['자동차는', '신기해요.', ...]
  let ngram: string[] = [];

  if (startIndex !== 0) {
    readingTextArr = readingTextArr.splice(startIndex);
  }

  //   const nGramLength = readingTextArr.length >= 5 ? 5 : readingTextArr.length;

  for (let i = 1; i <= ngramLength; i++) {
    const partOfFullReadingText = readingTextArr.filter((txt, index) => {
      return index < i;
    });
    ngram.push(partOfFullReadingText.join(' '));
  }
  console.log('ngram : ', ngram);
  return ngram;
};

let passedStt: string = '';
let passedWordNum: number = 0;
let isPassingReadingIndex = false;
const sttDelaySeconds = 1000;
let zeroCount = 0;

type rftMode = 'reading' | 'listening' | 'recording';

const backAction = () => {
  Alert.alert('종료하시겠습니까?', '', [
    {
      text: '취소',
      onPress: () => null,
      style: 'cancel',
    },
    {text: '종료', onPress: goBack},
  ]);
  return true;
};

let timer: NodeJS.Timeout | null = null;
let nowSentenceMaxPoint = 0;
let nowSentencePointCount = 0;

export const useReadingTraining = (rft: rft) => {
  useSoundMode();

  const member = useAtomValue(memberState);

  const nowReadingIndexRef = useRef(0);
  const [nowReadingIndex, _setNowReadingIndex] = useState(0);
  const [chkReadingIndex, _setChkReadingIndex] = useState<number[]>([]);

  const setChkReadingIndex = (value: number) => {
    _setChkReadingIndex(prev => {
      // 이미 배열에 값이 있는지 확인
      if (prev.includes(value)) {
        // 값이 있으면 그대로 이전 배열 반환 (중복 방지)
        return prev;
      } else {
        // 값이 없으면 새 배열에 추가

        console.log('chkReadingIndex:', [...prev, value]);

        return [...prev, value];
      }
    });
  };

  const setNowReadingIndex = (index: number) => {
    nowReadingIndexRef.current = index;
    _setNowReadingIndex(() => index);
  };

  // const [nonPassWordIndexList, setNonPassWrodIndexList] = useState<number[]>([]);
  //   const [nonPassWordIndexList, nonPassWordIndexListRef, setNonPassWrodIndexList] = useRefState<number[]>([]);
  const [nonPassWordIndexList, _setNonPassWrodIndexList] = useState<number[]>([]);
  const nonPassWordIndexListRef = useRef<number[]>([]);
  //    const stateRef = useRef([]);
  const setNonPassWrodIndexList = (newState: number[]) => {
    console.log('new State : ', newState);
    nonPassWordIndexListRef.current = newState;
    _setNonPassWrodIndexList(newState);
  };
  const [indexOfWords, _setIndexOfWords] = useState(0);
  const indexOfWordsRef = useRef(0);
  const setIndexOfWords = (index: number) => {
    _setIndexOfWords(() => index);
    indexOfWordsRef.current = index;
  };

  const [sentences, _setSentences] = useState<string[]>([]);
  const sentencesRef = useRef<string[]>([]);
  const setSentences = (sentence: string[]) => {
    sentencesRef.current = sentence;
    _setSentences(sentence);
  };

  const [ttsIndex, _setTtsIndex] = useState(-1);
  const ttsIndexRef = useRef<number>(-1);
  const setTtsIndex = (index: number) => {
    ttsIndexRef.current = index;
    _setTtsIndex(index);
  };

  const modal = useModal<'firstTutorial' | 'secondTutorail'>();
  const [studySeconds, setStudySeconds] = useState(0);
  const [rftMode, _setRftMode] = useState<'reading' | 'listening' | 'recording'>(rft.rft_text === '' ? 'recording' : 'reading');
  const rftModeRef = useRef<rftMode>('reading');
  const setRftMode = (mode: rftMode) => {
    rftModeRef.current = mode;
    _setRftMode(mode);
  };

  const [isTtsing, _setIsTtsing] = useState(false);
  const isTtsingRef = useRef(false);
  const setIsTtsing = (isTtsing: boolean) => {
    isTtsingRef.current = isTtsing;
    _setIsTtsing(isTtsing);
  };

  const [recordingTimer, setRecordingTimer] = useState(0);

  const [points, _setPoints] = useState<number[]>([]);
  const pointsRef = useRef<number[]>([]);
  const setPoints = (points: number[]) => {
    pointsRef.current = points;
    _setPoints(points);
  };

  const [isRecordFetching, setIsRecordFetching] = useState(false);

  const isTtsPressed = useRef(false);

  let isFirstThisComp = useRef(true);

  useEffect(() => {
    requestPermission();

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  // //-----------------------학습시간-----------------------//
  useEffect(() => {
    console.log('현재 학습 시간 "  : ', studySeconds);
    timer = setTimeout(() => {
      setStudySeconds(prev => prev + 1);
    }, 1000);
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [studySeconds]);

  // //-----------------------학습시간-----------------------//

  // //-----------------------Tutorial-----------------------//
  useEffect(() => {
    if (isFirstThisComp.current) {
      modal.changeType('firstTutorial');
      isFirstThisComp.current = false;
    }
    if (rftMode === 'recording') {
      modal.changeType('secondTutorail');
    }
  }, [rftMode]);

  // //-----------------------Tutorial-----------------------//

  // //-----------------------Listening Mode-----------------------//
  useEffect(() => {
    if (rftMode === 'listening') readBookWithTTS();
  }, [ttsIndex]);
  // //-----------------------Listening Mode-----------------------//

  // //-----------------------STT Func-----------------------//

  useEffect(() => {
    Voice.onSpeechError = _onSpeechError;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechPartialResults = _onSpeechPartialResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onPressGoBackBtn = async () => {
    await Voice.stop();
    await Voice.cancel();
    await Voice.destroy();
    backAction();
  };

  const _onSpeechError = (e: SpeechErrorEvent) => {
    return Platform.OS === 'android' && startRecognizing();
  };

  const destoryRecognizer = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Voice.stop();
        await Voice.cancel();
      }
      await Voice.destroy();
    } catch (e) {}
  };

  const startRecognizing = async () => {
    try {
      if (rftModeRef.current === 'reading') {
        const isVoicAvailable = await Voice.isAvailable();

        if (isVoicAvailable === 1 || isVoicAvailable) {
          await Voice.start('en-EU');
        }
      }
    } catch (e) {}
  };

  const _onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (Platform.OS === 'android') {
      if (e.value) {
        let nonPassedStt = e.value[0].substring(passedStt.length);
        // console.log('passedStt : ', passedStt);
        // console.log('_onSpeechPartialResults nonPassedStt : ' + nonPassedStt);
        //   if (nonPassedStt.trim() !== '') checkIOSUserSpeaking(nonPassedStt, false);
        if (nonPassedStt.trim() !== '') checkUserPeaking(nonPassedStt, false);

        //   }
      }
    }
  };

  const _onSpeechResults = async (e: SpeechResultsEvent) => {
    if (e.value) {
      if (Platform.OS === 'ios') {
        const userWordList = e.value[0].split(' ');
        console.log('userWordList : ', userWordList);
        if (passedWordNum < userWordList.length) {
          const moreWordNum = userWordList.length - passedWordNum;
          passedWordNum = userWordList.length;

          let notPassedStt = '';
          for (let i = 0; i < moreWordNum; i++) {
            const lastWord = userWordList.pop();
            notPassedStt = lastWord + ' ' + notPassedStt;
          }

          checkUserPeaking(notPassedStt.trim(), true);
        } else {
          const lastWord = userWordList.pop();
          passedWordNum = userWordList.length;
          if (lastWord) {
            checkUserPeaking(lastWord, true);
          }
        }
      } else {
        let nonPassedStt = e.value[0].substring(passedStt.length);

        console.log('_onSpeechResults passedStt ,', passedStt);

        console.log('_onSpeechResults nonPassedStt ,', nonPassedStt);
        if (nonPassedStt.trim() !== '') checkUserPeaking(nonPassedStt, true);
        Platform.OS === 'android' && startRecognizing();
      }
    }
  };

  const findBestMatch = (userTest: string, candTest: string[]) => {
    const userCode = metaphone(userTest);
    interface LevenshteinResponse {
      steps: number;
      relative: number;
      similarity: number;
      word: string;
    }
    console.log('userCode : ', userCode);
    let topWordInfo: LevenshteinResponse | null = null;
    for (let i = 0; i < candTest.length; i++) {
      const candCode = metaphone(candTest[i]);
      const lev: LevenshteinResponse = Leven(userCode, candCode);
      console.log('lev : ', lev);
      if (topWordInfo === null) {
        topWordInfo = lev;
        topWordInfo.word = candTest[i];
      } else {
        if (lev?.similarity > topWordInfo?.similarity) {
          topWordInfo = lev;
          topWordInfo.word = candTest[i];
        }
      }
    }

    return topWordInfo;
  };

  const checkUserPeaking = (userTxt: string, isResults?: boolean) => {
    passedStt += userTxt;
    if (isResults === true) {
      passedStt = '';
    }

    if (sentencesRef.current.length > 0) {
      const ngramList = makeNgram(sentencesRef.current[nowReadingIndexRef.current], indexOfWordsRef.current, userTxt.split(' ').length + 1);

      if (ngramList.length > 0) {
        const bestMatch = findBestMatch(userTxt, ngramList);
        console.log('bestMatch : ', bestMatch);
        if (bestMatch) {
          if (bestMatch?.similarity >= 0.3) {
            console.log('x통과한 단어들 : ', bestMatch.word);

            nowSentenceMaxPoint += bestMatch.similarity;
            nowSentencePointCount++;
            console.log('passed nowSentenceMaxPoint : ', nowSentenceMaxPoint);
            setIndexOfWords(indexOfWordsRef.current + bestMatch.word.split(' ').length);

            checkNowPosition();
          } else if (bestMatch.similarity < 0.2) {
            checkNowPosition();
          } else {
            console.log('미달된 단어들 : ', bestMatch.word);
            const totalReadedIndex = indexOfWordsRef.current + bestMatch.word.split(' ').length;
            const _nonPassWordIndexList = [...nonPassWordIndexListRef.current];
            for (let i = indexOfWordsRef.current; i < totalReadedIndex; i++) {
              _nonPassWordIndexList.push(i);
            }
            setNonPassWrodIndexList(_nonPassWordIndexList);
            nowSentenceMaxPoint += bestMatch.similarity;
            nowSentencePointCount++;
            setIndexOfWords(totalReadedIndex);

            checkNowPosition();

            //   sttNonPassCount++;
          }
        }
      }
    }
  };

  /**
   * @deprecated
   * @param userTxt
   * @param isResults
   */
  const checkIOSUserSpeaking = async (userTxt: string, isResults?: boolean) => {
    console.log('');
    console.log('user txt : ', userTxt);
    console.log('');

    if (isTtsingRef.current === false && isResults === true && Platform.OS === 'android') {
      passedStt = '';
    } else {
      passedStt += userTxt + ' ';
    }

    if (sentencesRef.current.length > 0) {
      const ngramList = makeNgram(sentencesRef.current[nowReadingIndexRef.current], indexOfWordsRef.current, userTxt.split(' ').length + 1);

      console.log('nGramlist : ', ngramList);

      if (ngramList.length > 0) {
        const {bestMatch} = stringSimilarity.findBestMatch(userTxt, ngramList);

        console.log('bestMatch : ', bestMatch);

        if (bestMatch.rating >= 0.3) {
          console.log('x통과한 단어들 : ', bestMatch.target);
          const totalReadedIndex = indexOfWordsRef.current + bestMatch.target.split(' ').length;

          nowSentenceMaxPoint += bestMatch.rating;
          nowSentencePointCount++;
          setIndexOfWords(totalReadedIndex);
          zeroCount = 0;

          checkNowPosition();
        } else if (ngramList[0] === 'a') {
          zeroCount = 0;
          const totalReadedIndex = indexOfWordsRef.current + bestMatch.target.split(' ').length;

          nowSentenceMaxPoint += bestMatch.rating;
          nowSentencePointCount++;
          setIndexOfWords(totalReadedIndex);
          checkNowPosition();
        } else if (zeroCount < 2 && bestMatch.rating === 0) {
          zeroCount++;
          checkNowPosition();
        } else {
          console.log('미달된 단어들 : ', bestMatch.target);
          zeroCount = 0;

          const totalReadedIndex = indexOfWordsRef.current + bestMatch.target.split(' ').length;
          const _nonPassWordIndexList = [...nonPassWordIndexListRef.current];
          for (let i = indexOfWordsRef.current; i < totalReadedIndex; i++) {
            _nonPassWordIndexList.push(i);
          }
          setNonPassWrodIndexList(_nonPassWordIndexList);
          nowSentenceMaxPoint += bestMatch.rating;
          nowSentencePointCount++;
          setIndexOfWords(totalReadedIndex);

          checkNowPosition();
        }
      } else {
        console.log('checkNowPosition else');
        checkNowPosition();
      }
    }
  };

  const checkNowPosition = async () => {
    // setChkReadingIndex(nowReadingIndexRef.current); //test
    // 지금 어절이 마지막 어절인지 체크
    if (indexOfWordsRef.current === sentencesRef.current[nowReadingIndexRef.current].split(' ').length) {
      if (isPassingReadingIndex === false) {
        isPassingReadingIndex = true;
        setTimeout(() => {
          isPassingReadingIndex = false;
        }, 1000);
        const _points = [...pointsRef.current];
        _points[nowReadingIndexRef.current] = Math.round(nowSentenceMaxPoint * 100) / nowSentencePointCount / 100;
        nowSentenceMaxPoint = 0;
        nowSentencePointCount = 0;
        setPoints(_points);
        await destoryRecognizer();
        setTimeout(() => startRecognizing(), sttDelaySeconds);
        setTimeout(() => {
          setNonPassWrodIndexList([]);
          setChkReadingIndex(nowReadingIndexRef.current);
          console.log('sentencesRef : ', sentencesRef.current.length);
          console.log(' chkReadingIndex: ' + chkReadingIndex);
          setNowReadingIndex(nowReadingIndexRef.current + 1);
          setIndexOfWords(0);
          passedStt = '';
          passedWordNum = 0;
        }, 800);
      }
    }
  };
  // //-----------------------STT Func-----------------------//

  useEffect(() => {
    setSentences(rft.rft_text.split('\n'));
    const _points = new Array(rft.rft_text.split('\n').length).fill(0);
    setPoints(_points);
  }, []);

  // //-----------------------TTS Func-----------------------//

  useEffect(() => {
    Tts.setDefaultLanguage('en-IE');
    Tts.setDefaultRate(0.45);

    // if (Platform.OS === 'ios') Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');

    Tts.addEventListener('tts-finish', () => {
      console.log('tts-finish');
      if (isTtsPressed.current === false) {
        if (rftModeRef.current === 'reading') {
          setIsTtsing(false);
          setTimeout(() => startRecognizing(), 1000);
        } else if (rftModeRef.current === 'listening') {
          if (ttsIndexRef.current < sentencesRef.current.length - 1) {
            setTimeout(() => setTtsIndex(ttsIndexRef.current + 1), 300);
          } else {
            setRftMode('reading');
          }
        }
      }
    });

    return () => {
      Tts.stop();
      Tts.removeAllListeners('tts-finish');
    };
  }, []);

  const readBookWithTTS = async (index?: number) => {
    try {
      isTtsPressed.current = true;
      await Tts.stop();
      setTimeout(() => (isTtsPressed.current = false), 300);
      if (rftMode === 'reading') {
        setIsTtsing(true);
        await destoryRecognizer();

        Tts.speak(sentences[nowReadingIndexRef.current]);
      } else if (rftMode === 'listening') {
        ttsIndex >= 0 && Tts.speak(sentences[ttsIndex]);
      } else {
        typeof index === 'number' && Tts.speak(sentences[index]);
      }
    } catch (error) {}
  };

  // //-----------------------TTS Func-----------------------//

  // //-----------------------Record Func-----------------------//

  useEffect(() => {
    return () => {
      onStopRecord();
    };
  }, []);

  const path = Platform.OS === 'android' ? `${RNFetchBlob.fs.dirs.DownloadDir}/${Date.now()}response.mp3` : `${Date.now()}response.m4a`;

  const audioSet: AudioSet = {
    AudioEncodingBitRateAndroid: 128000,
    AudioSamplingRateAndroid: 44100,
    // AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    // AudioSourceAndroid: AudioSourceAndroidType.MIC,
    OutputFormatAndroid: OutputFormatAndroidType.MPEG_4,
    AVModeIOS: AVModeIOSOption.spokenaudio,
    // AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.medium,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
  };
  const meteringEnabled = false;

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder(path, audioSet, meteringEnabled);
    // const result = await audioRecorderPlayer.startRecorder(path);
    SimpleToast.show('녹음이 시작되었습니다. 전체 문장을 소리내어 읽어주세요.');

    audioRecorderPlayer.addRecordBackListener(e => {
      console.log('e record Listener');
      console.log('currentPosition : ', e.currentPosition);
      setRecordingTimer(Math.floor(e.currentPosition / 1000));
      return;
    });
  };

  const onStopRecord = async () => {
    rftModeRef.current === 'recording' && SimpleToast.show('녹음이 종료되었습니다.');
    const result = await audioRecorderPlayer.stopRecorder();
    // const mp3File = await getAudioFile(result);
    audioRecorderPlayer.removePlayBackListener();
    audioRecorderPlayer.removeRecordBackListener();
    return result;
  };

  // //-----------------------Record Func-----------------------//

  // //-----------------------handler Func-----------------------//

  const onPressRftModeBtn = (mode: rftMode) => {
    destoryRecognizer();
    Tts.stop();
    if (mode === 'recording') {
      Alert.alert(
        '',
        chkReadingIndex.length + 3 >= sentencesRef.current.length
          ? '읽기 정확도 평가를 종료하고 다음 단계로 넘어가시겠습니까?'
          : '읽기 정확도 평가를 종료하고 다음 단계로 넘어가시겠습니까?\n\n문장을 모두 읽지 않으면 정확도 측정을 하실 수 없습니다.',
        [
          {
            text: '취소',
            onPress: () => startRecognizing(),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => setRftMode(mode)},
        ],
        {
          cancelable: true,
          onDismiss: () => Alert.alert('This alert was dismissed by tapping outside of the alert dialog.'),
        },
      );
    } else {
      if (mode === 'listening') {
        setTtsIndex(0);
        setRftMode(mode);
      } else {
        console.log('mode : ', mode);
        setRftMode(mode);
        startRecognizing();
      }
    }
  };

  const onPressSentence = async (readingLineIndex: number) => {
    if (rftMode === 'reading') {
      setIndexOfWords(0);
      setNonPassWrodIndexList([]);
      setNowReadingIndex(readingLineIndex);
      passedStt = '';
    } else if (rftMode === 'listening') {
      await Tts.stop();
      setTtsIndex(readingLineIndex);
    } else {
      readBookWithTTS(readingLineIndex);
    }
  };

  const onRequestCloseModal = (modalType: 'firstTutorial' | 'secondTutorail') => {
    if (modalType === 'firstTutorial') {
      modal.close();
      startRecognizing();
    } else {
      onStartRecord();
      modal.close();
    }
  };

  const onPressQuitReadingButton = async () => {
    let recordUri = '';
    try {
      setIsRecordFetching(true);
      recordUri = await onStopRecord();
      var [score, readRate] = getRftResultPoint(pointsRef.current);
      const totalSeconds = (Number(rft.rft_read_time) + studySeconds).toString();
      console.log('recordUri : ', recordUri);

      const {data} = await writeRftFetch({
        mem_id: member.mem_id,
        diary_seq_num: rft.diary_seq_num,
        read_rate: readRate,
        read_time: (Number(rft.rft_read_time) + studySeconds).toString(),
        read_accuracy: chkReadingIndex.length + 3 >= sentencesRef.current.length ? score : '0',
        RecordFileUri: recordUri,
      });
      score = chkReadingIndex.length + 3 >= sentencesRef.current.length ? score : '-';
      await RNFetchBlob.fs.unlink(recordUri);
      replace('testResultBoard', {score, seconds: studySeconds, type: rft.rft_text === '' ? 'recording' : 'rft'});
      setIsRecordFetching(false);
    } catch (error) {
      await RNFetchBlob.fs.unlink(recordUri);
      SimpleToast.show('잠시 후 다시 시도해주세요.');
      var [score, readRate] = getRftResultPoint(pointsRef.current);
      score = chkReadingIndex.length + 3 >= sentencesRef.current.length ? score : '-';
      replace('testResultBoard', {score, seconds: studySeconds, type: rft.rft_text === '' ? 'recording' : 'rft'});

      setIsRecordFetching(false);
    }
  };

  // //-----------------------handler Func-----------------------//

  const getRftResultPoint = (points: number[]): [string, string] => {
    const _points = points.filter(point => {
      return Number.isNaN(point) === false && point !== 0;
    });
    const sumOfPoints = _points.reduce((a, b) => a + b, 0);
    const readRate = Math.ceil((_points.length / points.length) * 100).toString();
    let score = (Math.ceil((sumOfPoints / _points.length) * 10) * 10).toString();

    score = score === 'NaN' ? '0' : score;

    return [score, readRate];
  };

  return {
    chkReadingIndex,
    nowReadingIndex,
    sentences,
    rftMode,
    indexOfWords,
    modal,
    ttsIndex,
    studySeconds,
    nonPassWordIndexList,
    isTtsing,
    isRecordFetching,
    recordingTimer,
    readBookWithTTS,
    onPressSentence,
    onPressRftModeBtn,
    onRequestCloseModal,
    onPressQuitReadingButton,
    onPressGoBackBtn,
    // onStartRecord,
    // onStopRecord,
  };
};
