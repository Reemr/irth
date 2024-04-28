import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppText from './AppText';
import {ABeeZee} from '../themes/fonts';
import colors from '../themes/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type Props = {
  title: string;
  bgColor?: string;
  textColor?: string;
  containerStyle?: any;
  textStyle?: any;
  onPress?: () => void;
};

const CustomButton = ({
  title,
  bgColor = colors.philippineBronze,
  textColor = colors.white,
  containerStyle,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity style={[styles.container]}>
      <AppText
        label={title}
        size={'medium'}
        fontFamily={ABeeZee.regular}
        color={textColor}
        align="center"
        lineHeight={wp(5.5)}
      />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.philippineBronze,
    paddingVertical: hp(1.8),
    borderRadius: wp(7),
  },
});
