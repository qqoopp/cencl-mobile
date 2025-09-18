import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  itemList: {label: string; value: string}[];
  bgColor?: string; // bgColor를 옵셔널하게 변경
  onChangeValue: (value: string) => void;
}

const dropdownWidth = 210;

const NoLineDropDownPicker = ({itemList, onChangeValue, bgColor}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState(itemList);

  useEffect(() => {
    if (value === '' && itemList.length > 0) {
      setValue(itemList[itemList.length - 1]?.value);
    }

    setItems(itemList);
  }, [itemList]);

  const onSelectItem = ({label, value}: {label: string; value: string}) => {
    setValue(value);
    onChangeValue(value);
  };

  return (
    <DropDownPicker
      style={{width: dropdownWidth, borderWidth: 0, zIndex: 100, backgroundColor: bgColor || 'transparent'}}
      containerStyle={{width: dropdownWidth, borderWidth: 0, zIndex: 100}}
      autoScroll
      onSelectItem={onSelectItem}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode="SCROLLVIEW"
      //   scrollViewProps={{
      //     nestedScrollEnabled: true,
      //   }}
      dropDownContainerStyle={{
        width: '100%',
        borderWidth: 0,
      }}
      textStyle={{
        width: '100%',
        textAlign: 'center', // 텍스트 가운데 정렬
        color: '#000', // 텍스트 색상 설정
      }}
    />
  );
};

export default NoLineDropDownPicker;

const styles = StyleSheet.create({
  container: {
    width: 400,
    borderWidth: 0,
    zIndex: 1000,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    width: dropdownWidth,
    borderWidth: 0,
    zIndex: 1000,
  },
  selectedTextStyle: {
    width: dropdownWidth,
    borderWidth: 0,
    zIndex: 1000,
    color: '#000',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    zIndex: 1000,
  },
});
