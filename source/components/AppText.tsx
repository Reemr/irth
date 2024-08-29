import {Text, TextStyle} from 'react-native';
import React from 'react';
import colors from '../themes/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

type Props = {
  label: string;
  color?: string;
  size?: string;
  align?: string;
  underline?: boolean;
  textStyles?: TextStyle | TextStyle[];
  opacity?: number;
  lines?: number;
  fontFamily?: string;
  lineHeight?: number;
};

const AppText = (props: Props) => {
  const {
    label,
    color = colors.black,
    size = 'regular',
    align,
    underline,
    textStyles,
    opacity,
    lines,
    fontFamily,
    lineHeight,
  } = props;

  const fontSize: any = {
    small: wp(3.3), // 14 px
    regular: wp(3.5), // 15 px
    medium: wp(4.7), // 20 px
    large: wp(5.6), // 24 px
    extraLarge: wp(7.5), // 32 px
  };
  const _size = fontSize[size];

  return (
    <Text
      numberOfLines={lines}
      style={[
        {
          color,
          fontSize: _size,
          textAlign:
            align === 'right'
              ? 'right'
              : align === 'center'
              ? 'center'
              : 'left',
          textDecorationLine: underline ? 'underline' : 'none',
          fontFamily: fontFamily,
          opacity,
        },
        lineHeight && {lineHeight: lineHeight},
        textStyles,
      ]}>
      {label}
    </Text>
  );
};

export default AppText;
