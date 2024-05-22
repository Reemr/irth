import {
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigion';
import {screens} from '../constants/screens';
import images from '../themes/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icons from '../themes/icons';
import globalStyles from '../themes/globalStyles';
import AppText from '../components/AppText';
import {ABeeZee, AbhayaLibre, Ciaro} from '../themes/fonts';
import colors from '../themes/colors';
import en from '../constants/en';
import ar from '../constants/ar';
import {setStorageValue} from '../utils/storageManager';
import storageKeys from '../constants/storageKeys';

type Props = NativeStackScreenProps<RootStackParamsList, screens.onboarding>;

const Onboard: React.FunctionComponent<Props> = ({navigation}) => {
  const onStart = async () => {
    await setStorageValue(storageKeys.onboardCompleted, true);
    navigation.replace(screens.siteMap);
  };
  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground source={images.onboardBg} style={styles.imageBg}>
        <Icons.inheritance style={styles.inheritance} width={100} />
      </ImageBackground>
      <View style={styles.contentContainer}>
        <View style={styles.rowContainer}>
          <View>
            <AppText
              label={en.screens.onboard.title}
              size={'extraLarge'}
              fontFamily={AbhayaLibre.extraBold}
              lineHeight={wp(7)}
              color={colors.spaceCadet}
            />
            <AppText
              label={en.screens.onboard.time}
              size={'extraLarge'}
              fontFamily={AbhayaLibre.extraBold}
              textStyles={styles.textShadow}
              lineHeight={wp(7)}
              color={colors.spaceCadet}
            />
          </View>
          <View style={styles.arContainer}>
            <AppText
              label={ar.screens.onboard.title}
              size={'extraLarge'}
              fontFamily={AbhayaLibre.extraBold}
              color={colors.spaceCadet}
              lineHeight={wp(9)}
            />
            <AppText
              label={ar.screens.onboard.time}
              size={'extraLarge'}
              fontFamily={AbhayaLibre.extraBold}
              textStyles={styles.textShadow}
              color={colors.spaceCadet}
              lineHeight={wp(9)}
            />
          </View>
        </View>
        <View style={[styles.rowContainer, styles.subContainer]}>
          <AppText
            label={en.screens.onboard.subTitle}
            size={'regular'}
            fontFamily={Ciaro.regular}
            color={colors.philippineGray}
            lineHeight={wp(4.7)}
          />
          <AppText
            label={ar.screens.onboard.subTitle}
            size={'regular'}
            fontFamily={Ciaro.regular}
            color={colors.philippineGray}
            lineHeight={wp(4.7)}
            align={'right'}
          />
        </View>
        <TouchableOpacity onPress={onStart} style={[styles.btnContainer]}>
          <AppText
            label={en.screens.onboard.start}
            size={'medium'}
            fontFamily={ABeeZee.italic}
            color={colors.white}
            lineHeight={wp(5.5)}
          />
          <AppText
            label={'|'}
            size={'medium'}
            fontFamily={ABeeZee.regular}
            color={colors.white}
            lineHeight={wp(5.5)}
            textStyles={styles.pipe}
          />
          <AppText
            label={ar.screens.onboard.start}
            size={'medium'}
            fontFamily={ABeeZee.regular}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  imageBg: {width: '100%', height: hp(62.5), resizeMode: 'contain'},
  inheritance: {
    marginTop: globalStyles.marginTopStatusBar,
    marginRight: wp(3),
    alignSelf: 'flex-end',
  },
  textShadow: {
    textShadowColor: colors.lightTaupe,
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 1,
  },
  contentContainer: {marginTop: hp(4), paddingHorizontal: wp(5)},
  rowContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  arContainer: {alignItems: 'flex-end', justifyContent: 'center'},
  subContainer: {marginTop: hp(1.5), marginBottom: hp(7)},
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: colors.philippineBronzeOP99,
    paddingVertical: hp(1.8),
    borderRadius: wp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pipe: {paddingHorizontal: wp(2)},
});
