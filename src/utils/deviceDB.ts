import AsyncStorage from '@react-native-async-storage/async-storage';

type deviceDBKey = 'isRftOneStepFirst' | 'isRftSecondStepFirst' | 'isKeepLogin' | 'id' | 'pw' | 'isAcademyLogin';

export const deviceDB = async (key: deviceDBKey, crud: 'get' | 'remove' | 'set', item?: string) => {
  let _item: string | null = null; // switch문 외부에서 미리 선언

  switch (crud) {
    case 'set':
      if (typeof item === 'string') {
        console.log('저장 key : ', key, ' 저장 value : ', item);
        await AsyncStorage.setItem(key, item);
      }
      break;
    case 'get':
      _item = await AsyncStorage.getItem(key);
      return _item;
    case 'remove':
      await AsyncStorage.removeItem(key);
      break;

    default:
      return false;
  }
};
