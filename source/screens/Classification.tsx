import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigion';
import {screens} from '../constants/screens';
import Header from '../components/Header';
import en from '../constants/en';
import ar from '../constants/ar';
import globalStyles from '../themes/globalStyles';
import colors from '../themes/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppText from '../components/AppText';
import {AbhayaLibre} from '../themes/fonts';

type Props = NativeStackScreenProps<
  RootStackParamsList,
  screens.classification
>;

const data = {
  enTitle: 'Aramaic language',
  enDiscription:
    ' is a sub-group of the Semitic languages containing many varieties that originated among the Arameans in the ancient region of Syria',
  arTitle: 'اللغة الآرامية',
  arDiscription:
    'هي لغة سامية شرقية -أوسطية، انطلقت مع قيام الحضارة  الآرامية في وسط سوريا وكانت لغة رسمية في بعض دول العالم القديم',
};

const Classification: React.FunctionComponent<Props> = () => {
  return (
    <View style={styles.mainContainer}>
      <Header
        enTitle={en.screens.classification.title}
        arTitle={ar.screens.classification.title}
      />
      <Image
        source={require('../assets/images/artifectFull.png')}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <View style={[styles.content, styles.titleContainer]}>
          <AppText
            label={data.enTitle}
            size={'extraLarge'}
            fontFamily={AbhayaLibre.extraBold}
            lineHeight={wp(7)}
            color={colors.spaceCadet}
            textStyles={styles.flex1}
          />
          <AppText
            label={data.arTitle}
            size={'extraLarge'}
            fontFamily={AbhayaLibre.extraBold}
            lineHeight={wp(9)}
            color={colors.spaceCadet}
            textStyles={[styles.flex1, styles.arTitle]}
            align={'right'}
          />
        </View>
        <View style={styles.content}>
          <AppText
            label={data.enDiscription}
            size={'small'}
            fontFamily={AbhayaLibre.extraBold}
            color={colors.spaceCadet}
            textStyles={styles.flex1}
          />
          <AppText
            label={data.arDiscription}
            size={'small'}
            fontFamily={AbhayaLibre.extraBold}
            color={colors.spaceCadet}
            textStyles={styles.flex1}
            align={'right'}
          />
        </View>
      </View>
    </View>
  );
};

export default Classification;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: globalStyles.screenPadding,
    backgroundColor: colors.philippineBronzeOP61,
    flex: 1,
  },
  image: {
    width: '100%',
    height: hp(55),
    borderRadius: wp(9.5),
    marginVertical: hp(2),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: wp(9.5),
    borderTopRightRadius: wp(9.5),
    paddingHorizontal: wp(4),
  },
  content: {flexDirection: 'row', justifyContent: 'space-between'},
  arTitle: {paddingTop: hp(1)},
  flex1: {flex: 1},
  titleContainer: {paddingTop: hp(3.5), paddingBottom: hp(1)},
});
