import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {
  clearGetArtifactDetails,
  getArtifactDetailsAction,
} from '../redux/slices/getArtifactDetails';
import Loader from '../components/Loader';

type Props = NativeStackScreenProps<RootStackParamsList, screens.details>;

const data = {
  enTitle: 'English',
  enDiscription:
    'A stela engraved with Aramic script dated 5th - 4th century BCE, Al-Hamra palace, Tayma, Tabuk',
  arTitle: 'عربي',
  arDiscription:
    'مسلة عليها كتابة بالخط الأرامي، حوالي القرن الخامس- الرابع قبل الميلاد، قصر الحمراء تيماء - تبوك',
};

const Details: React.FunctionComponent<Props> = ({route}) => {
  const {params} = route;

  const dispatch = useDispatch<AppDispatch>();
  const artifactDetails = useSelector(
    (state: RootState) => state.getArtifactDetails,
  );

  useEffect(() => {
    if (params?.detailId) {
      dispatch(getArtifactDetailsAction(params?.detailId));
    }
  }, []);

  useEffect(() => {
    if (artifactDetails?.error) {
      Alert.alert(artifactDetails?.error);
      dispatch(clearGetArtifactDetails());
    }
  }, [artifactDetails]);

  return (
    <View style={styles.mainContainer}>
      <Header
        enTitle={en.screens.details.title}
        arTitle={ar.screens.details.title}
      />
      <Image
        source={{uri: artifactDetails?.data?.image}}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <View style={[styles.content, styles.titleContainer]}>
          <AppText
            label={artifactDetails?.data?.engTitle || ''}
            size={'extraLarge'}
            fontFamily={AbhayaLibre.extraBold}
            lineHeight={wp(7)}
            color={colors.philippineBronze}
            textStyles={styles.flex1}
          />
          <AppText
            label={artifactDetails?.data?.arTitle || ''}
            size={'extraLarge'}
            fontFamily={AbhayaLibre.extraBold}
            lineHeight={wp(9)}
            color={colors.philippineBronze}
            textStyles={styles.flex1}
            align={'right'}
          />
        </View>
        <View style={styles.content}>
          <AppText
            label={artifactDetails?.data?.engDescription || ''}
            size={'small'}
            fontFamily={AbhayaLibre.extraBold}
            color={colors.philippineBronze}
            textStyles={styles.flex1}
          />
          <AppText
            label={artifactDetails?.data?.arDescription || ''}
            size={'small'}
            fontFamily={AbhayaLibre.extraBold}
            color={colors.philippineBronze}
            textStyles={styles.flex1}
            align={'right'}
          />
        </View>
      </View>
      {artifactDetails?.isLoading && <Loader />}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: globalStyles.screenPadding,
    backgroundColor: colors.white,
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
    backgroundColor: colors.lightTaupe,
    borderTopLeftRadius: wp(9.5),
    borderTopRightRadius: wp(9.5),
    paddingHorizontal: wp(4),
  },
  content: {flexDirection: 'row', justifyContent: 'space-between'},
  flex1: {flex: 1},
  titleContainer: {paddingTop: hp(3.5), paddingBottom: hp(1)},
});
