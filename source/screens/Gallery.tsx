import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {clearGetGallery, getGalleryAction} from '../redux/slices/getGallery';
import {Gallery as GalleryData} from '../types/collectionTypes';
import Loader from '../components/Loader';

type Props = NativeStackScreenProps<RootStackParamsList, screens.gallery>;

const Gallery: React.FunctionComponent<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const galleryData = useSelector((state: RootState) => state.getGallery);

  useEffect(() => {
    dispatch(getGalleryAction());
  }, []);

  useEffect(() => {
    if (galleryData?.error) {
      Alert.alert(galleryData?.error);
      dispatch(clearGetGallery());
    }
  }, [galleryData]);

  const renderItem = ({item}: {item: GalleryData}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(screens.details, {detailId: item?.detailId})
        }>
        <Image source={{uri: item?.image}} style={styles.image} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        enTitle={en.screens.gallery.title}
        arTitle={ar.screens.gallery.title}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        data={galleryData?.data}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <View style={styles.seprator} />}
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
  image: {height: wp(28.5), width: wp(28.5), borderRadius: wp(9.5)},
  columnWrapper: {gap: wp(2)},
  seprator: {height: hp(1.5)},
});
