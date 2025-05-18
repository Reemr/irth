import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigion';
import {screens} from '../constants/screens';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import globalStyles from '../themes/globalStyles';
import colors from '../themes/colors';
import en from '../constants/en';
import ar from '../constants/ar';
import Header from '../components/Header';
import {launchImageLibrary, launchCamera, Asset} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {clearGetGallery, getGalleryAction} from '../redux/slices/getGallery';
import {Gallery as GalleryData} from '../types/collectionTypes';
import Loader from '../components/Loader';

type Props = NativeStackScreenProps<
  RootStackParamsList,
  screens.gallery
>;

const Gallery: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const galleryData = useSelector((state: RootState) => state.getGallery);

  useEffect(() => {
    dispatch(getGalleryAction());
  }, []);

  useEffect(() => {
    if (galleryData?.error) {
      Alert.alert(galleryData.error);
      dispatch(clearGetGallery());
    }
  }, [galleryData]);

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

  const renderItem = ({item}: {item: GalleryData}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(screens.details, {detailId: item.detailId})
      }>
      <Image source={{uri: item.image}} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <Header
        enTitle={en.screens.gallery.title}
        arTitle={ar.screens.gallery.title}
      />

      {/* Pick from library */}
      <Button title="Pick & Classify" onPress={pickAndClassify} />

      {/* Capture from camera */}
      <Button title="Capture & Classify" onPress={captureAndClassify} />

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        data={galleryData?.data}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {galleryData?.isLoading && <Loader />}
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: globalStyles.screenPadding,
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {paddingVertical: hp(2), alignSelf: 'center'},
  image: {
    height: wp(28.5),
    width: wp(28.5),
    borderRadius: wp(9.5),
  },
  columnWrapper: {gap: wp(2)},
  separator: {height: hp(1.5)},
});
