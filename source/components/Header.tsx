import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../themes/colors';
import AppText from './AppText';
import {AbhayaLibre} from '../themes/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import globalStyles from '../themes/globalStyles';

type Props = {enTitle: string; arTitle: string};

const Header = ({enTitle, arTitle}: Props) => {
  return (
    <View style={styles.container}>
      <AppText
        label={enTitle}
        size={'large'}
        fontFamily={AbhayaLibre.extraBold}
        color={colors.white}
        lineHeight={wp(7)}
      />
      <AppText
        label={arTitle}
        size={'large'}
        fontFamily={AbhayaLibre.extraBold}
        color={colors.white}
        lineHeight={wp(7)}
        align={'right'}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.philippineBronze,
    paddingTop:
      globalStyles.marginTopStatusBar + (Platform.OS == 'ios' ? hp(0.5) : 0),
    paddingHorizontal: wp(5),
    paddingBottom: hp(2.3),
    borderBottomLeftRadius: wp(9.5),
    borderBottomRightRadius: wp(9.5),
  },
});
