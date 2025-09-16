import {getWordTestFetch, studyWordTestFetch, testWordTestFetch} from '@/api/wordTest';
import {useSound} from '@/hooks/useSound';
import {useTimer} from '@/hooks/useTimer';
import memberState from '@/states/memberState';
import {goBack} from '@/utils/rootNavigations';
import {useEffect, useState} from 'react';
import SimpleToast from 'react-native-simple-toast';
import {useAtomValue} from 'jotai';

type wordTestStep = 'prev' | 'study' | 'test' | 'result';

const getSecondsFromTime = (time: string) => {
  console.log('getSecondsFromTime : ', time);
  const times = time.split(':').map(time => Number(time));
  return 60 * times[0] + times[1];
};

export const useVocaTest = (selectedDate: string): Return => {
  const [step, setStep] = useState<wordTestStep>('prev');
  const [testInfo, setTestInfo] = useState<getWordTest | null>(null);
  const [nowWord, setNowWord] = useState<studyWordTest | null>(null);
  const [nowAnswer, setNowAnswer] = useState<studyWordTest | null>(null);
  const [wordStudy, setWordStudy] = useState<studyWordTest[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [answerSeqList, setAnswerSeqList] = useState<string[]>([]);
  const [distractors, setDistractors] = useState<studyWordTest[][]>([]);
  const [nowTestIndex, setNowTestIndex] = useState(0);
  const [retestIndex, setRetestIndex] = useState(0);
  const [wrongAnswerIndexes, setWrongAnswerIndexes] = useState<number[]>([]);
  const [isRetest, setIsRetest] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const member = useAtomValue(memberState);

  const {onPressPlayBtn} = useSound();

  const {seconds, resetTimer, startTimer, stopTimer} = useTimer();

  useEffect(() => {
    if (step === 'prev') {
      resetTimer();
    } else if (step === 'test') {
      setTotalSeconds(totalSeconds + seconds);
      startTimer();
    } else if (step === 'result') {
      stopTimer();
    }
    return () => {
      resetTimer();
    };
  }, [step]);

  useEffect(() => {
    setNowUserAnswer();
  }, [nowTestIndex, step]);

  useEffect(() => {
    getTestInfo();
  }, []);

  useEffect(() => {
    if (isRetest) {
      setNowTestIndex(wrongAnswerIndexes[retestIndex]);
    }
  }, [isRetest, retestIndex]);

  const getTestInfo = async () => {
    console.log('2');
    const {data} = await getWordTestFetch({mem_id: member.mem_id, date_start: selectedDate});

    console.log('vocaTest data');
    console.log('3');
    console.log(data);
    const testInfo = data.data[0];
    console.log('leadTime : ', testInfo.leadTime);

    console.log(testInfo.leadTime);
    const _seconds = testInfo?.leadTime === '' || testInfo?.leadTime === null ? 0 : getSecondsFromTime(testInfo.leadTime);
    setTotalSeconds(_seconds);
    setTestInfo(testInfo);
    console.log('4');
    setAnswerSeqList(testInfo.new_word_ids.split('|'));

    if (testInfo.new_answer_student !== null) {
      console.log('학생들 답 있음');
      const wrongAnswerIndexes = getPrevTextWrongAnswerIndexes(testInfo.new_word_ids, testInfo.new_answer_student);
      setWrongAnswerIndexes(wrongAnswerIndexes);
      setUserAnswers(testInfo.new_answer_student.split('|'));
    }

    getStudyInfoAndDistractors(testInfo.test_level, testInfo.test_week, testInfo);
  };

  const getStudyInfoAndDistractors = async (test_level: string, test_week: string, testInfo: getWordTest) => {
    const {data} = await studyWordTestFetch({mem_id: member.mem_id, test_level, test_week});
    const distractors = getDistractors(testInfo, data.data);

    setWordStudy(data.data);
    setNowWord(data.data[0]);
    setDistractors(distractors);
  };

  const getDistractors = (testInfo: getWordTest, wordStudy: studyWordTest[]) => {
    const distractorIndex = testInfo.new_answer_sheet.split('|').map(answe => {
      return answe.split(',');
    });
    const distractorList: studyWordTest[][] = [];
    for (let i = 0; i < distractorIndex.length; i++) {
      const distractors = [];

      for (let j = 0; j < distractorIndex[i].length; j++) {
        const findSeq = distractorIndex[i][j];
        for (let k = 0; k < wordStudy.length; k++) {
          if (wordStudy[k].seq_num.toString() === findSeq) {
            distractors.push(wordStudy[k]);
          }
        }
      }
      distractorList.push(distractors);
    }
    return distractorList;
  };

  const getPrevTextWrongAnswerIndexes = (answers: string, studentAnswer: string) => {
    const answerList = answers.split('|');
    const studentAnswerList = studentAnswer.split('|');
    const wrongAnswerIndexes: number[] = [];

    for (let i = 0; i < answerList.length; i++) {
      if (answerList[i] !== studentAnswerList[i]) {
        wrongAnswerIndexes.push(i);
      }
    }

    return wrongAnswerIndexes;
  };

  const onPressNextStep = () => {
    switch (step) {
      case 'prev':
        setStep('study');

        break;
      case 'study':
        wrongAnswerIndexes.length === 0 ? setStep('test') : reteset();

        break;
      case 'test':
        break;
    }
  };

  const onPressCard = (word: studyWordTest) => {
    setNowWord(word);
  };

  const onPressDistractor = (seq: string) => {
    let _answers = [...userAnswers];
    _answers[nowTestIndex] = seq;
    console.log('바뀔 userAnswerList : ');
    console.log(_answers[nowTestIndex]);
    _answers = _answers.map(answer => {
      return answer !== undefined ? answer : '';
    });
    setUserAnswers(_answers);
  };

  const onPressNextTestBtn = (isNext: boolean) => {
    console.log('버튼 isNext ', isNext);
    console.log('nowTestIndex : ', nowTestIndex);

    if (
      (isNext && isRetest && nowTestIndex === wrongAnswerIndexes[wrongAnswerIndexes.length - 1]) ||
      (isNext && nowTestIndex === wordStudy.length - 1)
    ) {
      console.log('1');
      checkAndSubmitTestResult();
    } else if (isNext && nowTestIndex < wordStudy.length - 1) {
      console.log('2');
      isRetest ? setRetestIndex(retestIndex + 1) : setNowTestIndex(nowTestIndex + 1);
    } else if (isNext === false && nowTestIndex !== 0) {
      console.log('3');

      isRetest ? setRetestIndex(retestIndex - 1) : setNowTestIndex(nowTestIndex - 1);
    }
  };

  const checkAndSubmitTestResult = async () => {
    if (checkIsHaveUnsolveQuestion()) {
      const {correctCount, wrongAnswerIndexes} = getNewTestWrongAnswerIndexesAndCorrectCount();
      await submitTestResult(correctCount, wrongAnswerIndexes);
      setWrongAnswerIndexes(wrongAnswerIndexes);
      setStep('result');
    }
  };

  const checkIsHaveUnsolveQuestion = () => {
    const unSloveNum = userAnswers.filter(a => a === '');
    console.log('안푼 문제 길이 : ', unSloveNum);
    const userAnswerCount = userAnswers.filter(a => a !== '');
    console.log('유저 담변 : ', userAnswers);
    console.log('유저 담변 : ', userAnswerCount);

    if (userAnswerCount.length === wordStudy.length) {
      return true;
    } else {
      SimpleToast.show('모든 문제를 다 풀고 제출해주세요.');
      return false;
    }
  };

  const getNewTestWrongAnswerIndexesAndCorrectCount = () => {
    const wrongAnswerIndexes: number[] = [];
    let correctCount = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === undefined) {
        correctCount = -1;
        break;
      }
      userAnswers[i] === answerSeqList[i] ? correctCount++ : wrongAnswerIndexes.push(i);
    }
    return {correctCount, wrongAnswerIndexes};
  };

  const submitTestResult = async (correctCount: number, wrongAnswerIndexes: number[]) => {
    if (correctCount >= 0) {
      const {data} = await testWordTestFetch({
        mem_id: member.mem_id,
        seq_num: testInfo?.seq_num ?? '',
        question_amount: wordStudy.length,
        correct_amount: correctCount,
        new_answer_student: userAnswers.join('|'),
        grade: correctCount * 4,
        leadTime: new Date((totalSeconds + seconds) * 1000).toISOString().substring(14, 19),
      });

      setWrongAnswerIndexes(wrongAnswerIndexes);
      setStep('result');
    }
  };

  const onPressResultOkayBtn = () => {
    wrongAnswerIndexes.length === 0 ? goBack() : reteset();
  };

  const reteset = () => {
    setStep('test');
    const _userAnswer = [...userAnswers];
    wrongAnswerIndexes.forEach(wrongIndex => {
      _userAnswer[Number(wrongIndex)] = '';
    });
    setRetestIndex(0);
    setIsRetest(true);
    setUserAnswers(_userAnswer);
  };

  const setNowUserAnswer = () => {
    if (step === 'test' && testInfo && wordStudy) {
      let nowAnswer: studyWordTest | null = null;

      distractors[nowTestIndex].forEach((distractor, index) => {
        if (distractor.seq_num.toString() === answerSeqList[nowTestIndex]) {
          nowAnswer = distractor;
        }
      });
      setNowAnswer(nowAnswer);
    }
  };

  return {
    step,
    testInfo,
    wordStudy,
    nowWord,
    nowTestIndex,
    distractors,
    userAnswers,
    answerSeqList,
    nowAnswer,
    wrongAnswerIndexes,
    seconds,
    isRetest,
    retestIndex,
    totalSeconds,
    onPressDistractor,
    onPressNextTestBtn,
    onPressNextStep,
    onPressCard,
    onPressResultOkayBtn,
    onPressPlayBtn,
  };
};
