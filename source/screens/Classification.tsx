import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
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
  clearUploadArtifactDetails,
  uploadArtifactDetailsAction,
} from '../redux/slices/uploadArtifactDetails';

import {predictArtifact, Prediction} from '../utils/inference';
import Svg, {Rect} from 'react-native-svg';

// Type for navigation props
type Props = NativeStackScreenProps<
  RootStackParamsList,
  screens.classification
>;

// Static content
const data = {
  enTitle: 'Aramaic language',
  enDiscription:
    ' is a sub-group of the Semitic languages containing many varieties that originated among the Arameans in the ancient region of Syria',
  arTitle: 'اللغة الآرامية',
  arDiscription:
    'هي لغة سامية شرقية -أوسطية، انطلقت مع قيام الحضارة  الآرامية في وسط سوريا وكانت لغة رسمية في بعض دول العالم القديم',
};

const Classification: React.FC<Props> = ({navigation, route}) => {
  const {params} = route;
  const dispatch = useDispatch<AppDispatch>();
  const artifactDetails = useSelector(
    (state: RootState) => state.uploadArtifactDetails,
  );

  // ▶ AI inference state
  const [photoUri, setPhotoUri] = useState<string | undefined>(
    params?.image?.uri,
  );
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  // Existing effects
  useEffect(() => {
    console.log('params?.image:>>>>', params?.image);
    const _data = {image: params?.image, content: data};
    // dispatch(uploadArtifactDetailsAction(_data));
  }, []);

  useEffect(() => {
    if (artifactDetails?.error) {
      Alert.alert(artifactDetails.error);
      dispatch(clearUploadArtifactDetails());
    }
  }, [artifactDetails]);

  // ▶ Run inference when image param changes
  useEffect(() => {
    if (params?.image?.uri) {
      analyzeImage(
        params.image.uri,
        params.image.fileName ?? 'photo.jpg',
        params.image.type ?? 'image/jpeg',
      );
    }
  }, [params?.image?.uri]);

  // ▶ Function to call inference API
  const analyzeImage = async (
    uri: string,
    fileName: string,
    mimeType: string,
  ) => {
    setError(undefined);
    setPrediction(null);
    setLoading(true);
    try {
      const result = await predictArtifact(uri, fileName, mimeType);
      setPrediction(result);
      setPhotoUri(uri);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={styles.mainContainer}
    >
      <Header
        enTitle={en.screens.classification.title}
        arTitle={ar.screens.classification.title}
      />

      {/* Image & overlays container */}
      <View style={{position: 'relative', marginVertical: hp(2)}}>
        <Image
          source={
            photoUri
              ? {uri: photoUri}
              : require('../assets/images/artifectFull.png')
          }
          style={styles.image}
        />

        {/* ▶ Loading spinner */}
        {loading && (
          <ActivityIndicator
            style={StyleSheet.absoluteFill}
            size="large"
          />
        )}

        {/* ▶ Bounding-box overlays */}
        {prediction?.boxes.map((box, i) => {
          const [x1, y1, x2, y2] = box;
          return (
            <Svg key={i} style={StyleSheet.absoluteFill}>
              <Rect
                x={x1}
                y={y1}
                width={x2 - x1}
                height={y2 - y1}
                stroke="red"
                strokeWidth={2}
                fill="transparent"
              />
            </Svg>
          );
        })}
      </View>

      {/* ▶ Error message */}
      {error && (
        <AppText
          label={error}
          size="small"
          color="red"
          textStyles={{marginTop: hp(1)}}
        />
      )}

      {/* Existing content below image */}
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
    </ScrollView>
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
