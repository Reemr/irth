import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigion';
import {screens} from '../constants/screens';
import MapView, {Marker} from 'react-native-maps';
import Icons from '../themes/icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../themes/colors';
import shadows from '../themes/shadows';
import SelectImageModal from '../components/SelectImageModal';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {
  clearGetLocations,
  getLocationsAction,
} from '../redux/slices/getLocations';
import Loader from '../components/Loader';
import AppText from '../components/AppText';
import {AbhayaLibre, Ciaro} from '../themes/fonts';
import {getVertexTokenAction} from '../redux/slices/getVertexToken';

type Props = NativeStackScreenProps<RootStackParamsList, screens.siteMap>;

const SiteMap: React.FunctionComponent<Props> = ({navigation}) => {
  const [isCameraModal, setIsCameraModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const locationsRes = useSelector((state: RootState) => state.getLocations);
  const vertexToken = useSelector((state: RootState) => state.getVertexToken);

  const selectImage = (image: any) => {
    console.log('image:>>>', image);

    navigation.navigate(screens.classification, {image});
  };

  const Markers = memo(() => {
    return locationsRes?.data?.map(item => (
      <Marker
        tracksViewChanges={false}
        key={item?.id}
        coordinate={{latitude: item?.latitude, longitude: item?.longitude}}
        title={item?.title}
        description={item?.description}>
        <View>
          <AppText
            label={item?.totalArtifacts?.toString()}
            fontFamily={Ciaro.medium}
            color={colors.white}
            textStyles={styles.totalArtifacts}
          />
          <Image source={{uri: item?.image}} style={styles.marker} />
        </View>
      </Marker>
    ));
  });

  useEffect(() => {
    dispatch(getLocationsAction());
    dispatch(getVertexTokenAction());
  }, []);

  useEffect(() => {
    if (locationsRes?.error) {
      Alert.alert(locationsRes?.error);
      dispatch(clearGetLocations());
    }
  }, [locationsRes]);

  return (
    <View style={styles.mainContaner}>
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={{
          latitude: 24.774265,
          longitude: 46.73858,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {locationsRes?.data && locationsRes?.data?.length > 0 && <Markers />}
      </MapView>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(screens.gallery)}
          style={styles.actionBox}>
          <Icons.photo height={33} width={33} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsCameraModal(true)}
          style={styles.actionRound}>
          <Icons.camera height={55} width={55} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBox}>
          <Icons.menu height={33} width={33} />
        </TouchableOpacity>
      </View>
      <SelectImageModal
        isVisible={isCameraModal}
        onClose={() => setIsCameraModal(false)}
        onSelect={selectImage}
      />
      {locationsRes?.isLoading && <Loader />}
    </View>
  );
};

export default SiteMap;
const styles = StyleSheet.create({
  mainContaner: {flex: 1},
  map: {...StyleSheet.absoluteFillObject},
  actionContainer: {
    position: 'absolute',
    bottom: hp(7),
    flexDirection: 'row',
    gap: wp(3),
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  actionBox: {
    backgroundColor: colors.white,
    width: wp(12),
    height: wp(13),
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primary,
  },
  actionRound: {
    backgroundColor: colors.white,
    height: wp(22),
    width: wp(22),
    borderRadius: wp(16.5),
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primary,
  },
  marker: {width: wp(14), height: wp(14), resizeMode: 'contain'},
  totalArtifacts: {
    backgroundColor: colors.philippineBronze,
    paddingHorizontal: wp(2),
    lineHeight: hp(3),
    borderRadius: wp(5),
    alignSelf: 'baseline',
    marginBottom: hp(-1.5),
    zIndex: 2,
  },
});
