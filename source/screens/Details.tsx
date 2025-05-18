import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
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
import {launchImageLibrary, launchCamera, Asset} from 'react-native-image-picker';

type Props = NativeStackScreenProps<
  RootStackParamsList,
  screens.details
>;

const Details: React.FC<Props> = ({navigation, route}) => {
  const {detailId} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const artifactDetails = useSelector(
    (state: RootState) => state.getArtifactDetails,
  );

  useEffect(() => {
    if (detailId) {
      dispatch(getArtifactDetailsAction(detailId));
    }
  }, [detailId]);

  useEffect(() => {
    if (artifactDetails?.error) {
      Alert.alert(artifactDetails.error);
      dispatch(clearGetArtifactDetails());
    }
  }, [artifactDetails]);

  // Launch image library picker
  const pickAndClassify = () => {
    launchImageLibrary({mediaType: 'photo'}, resp => {
      if (resp.didCancel || !resp.assets?.length) return;
      const asset: Asset = resp.assets[0];
      navigation.navigate(screens.classification, {
        image: {
          uri: asset.uri!,
          fileName: asset.fileName ?? 'photo.jpg',
          type: asset.type ?? 'image/jpeg',
        },
      });
    });
  };

  // Launch camera to capture photo
  const captureAndClassify = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, resp => {
      if (resp.didCancel || !resp.assets?.length) return;
      const asset: Asset = resp.assets[0];
      navigation.navigate(screens.classification, {
        image: {
          uri: asset.uri!,
          fileName: asset.fileName ?? 'photo.jpg',
          type: asset.type ?? 'image/jpeg',
        },
      });
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={styles.mainContainer}
    >
      <Header
        enTitle={en.screens.details.title}
        arTitle={ar.screens.details.title}
      />

      {/* Buttons for picking or capturing */}
      <Button title="Pick & Classify" onPress={pickAndClassify} />
      <Button title="Capture & Classify" onPress={captureAndClassify} />

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
    </ScrollView>
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
