import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
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

type Props = NativeStackScreenProps<RootStackParamsList, screens.siteMap>;

const SiteMap: React.FunctionComponent<Props> = ({navigation}) => {
  const [isCameraModal, setIsCameraModal] = useState(false);

  const selectImage = (image: any) => {
    navigation.navigate(screens.classification, {image});
  };

  const locations = [
    {
      id: 0,
      latitude: 24.774265,
      longitude: 46.738586,
      title: 'title 1',
      description: 'description 1',
      img: require('../assets/images/galleryImage1.png'),
    },
    {
      id: 1,
      latitude: 24.764265,
      longitude: 46.748586,
      title: 'title 2',
      description: 'description 2',
      img: require('../assets/images/galleryImage2.png'),
    },
    {
      id: 2,
      latitude: 24.784265,
      longitude: 46.748586,
      title: 'title 3',
      description: 'description 3',
      img: require('../assets/images/galleryImage3.png'),
    },
  ];

  const Markers = memo(() => {
    return locations?.map(item => (
      <Marker
        tracksViewChanges={false}
        key={item?.id}
        coordinate={{latitude: item?.latitude, longitude: item?.longitude}}
        title={item?.title}
        description={item?.description}>
        <Image source={item?.img} style={styles.marker} />
      </Marker>
    ));
  });

  return (
    <View style={styles.mainContaner}>
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={{
          latitude: 24.774265,
          longitude: 46.738586,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Markers />
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
  marker: {width: wp(12), height: wp(12), resizeMode: 'contain'},
});
