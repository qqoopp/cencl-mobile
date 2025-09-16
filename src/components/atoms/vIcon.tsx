import React from 'react';
import {View} from 'react-native';
import {IconButtonProps} from 'react-native-vector-icons/Icon';
import IIcon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import EVcon from 'react-native-vector-icons/EvilIcons';
import FoIcon from 'react-native-vector-icons/FontAwesome';
import OIcon from 'react-native-vector-icons/Octicons';
import FIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '@/theme/theme';

interface props extends IconButtonProps {
  type: 'Ionicons' | 'Entypo' | 'Octicons' | 'Feather' | 'EvilIcons' | 'FontAwesome' | 'MaterialIcons' | 'MaterialCommunityIcons';
}

const VIcon = ({type, color = theme.color.black, ...props}: props) => {
  if (type === 'Ionicons') return <IIcon color={color} {...props} />;
  if (type === 'Entypo') return <EIcon color={color} {...props} />;
  if (type === 'Octicons') return <OIcon color={color} {...props} />;
  if (type === 'Feather') return <FIcon color={color} {...props} />;
  if (type === 'EvilIcons') return <EVcon color={color} {...props} />;
  if (type === 'FontAwesome') return <FoIcon color={color} {...props} />;
  if (type === 'MaterialIcons') return <MaterialIcon color={color} {...props} />;
  if (type === 'MaterialCommunityIcons') return <MaterialCommunityIcon color={color} {...props} />;

  return <View />;
};

export default VIcon;
