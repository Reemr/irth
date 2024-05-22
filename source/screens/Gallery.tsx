import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
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

type Props = NativeStackScreenProps<RootStackParamsList, screens.gallery>;

type GalleryImg = {id: number; img: string};
const data: GalleryImg[] = [
  {id: 1, img: require('../assets/images/galleryImage1.png')},
  {id: 2, img: require('../assets/images/galleryImage2.png')},
  {id: 3, img: require('../assets/images/galleryImage3.png')},
  {id: 4, img: require('../assets/images/galleryImage4.png')},
  {id: 5, img: require('../assets/images/galleryImage5.png')},
  {id: 6, img: require('../assets/images/galleryImage1.png')},
  {id: 7, img: require('../assets/images/galleryImage2.png')},
  {id: 8, img: require('../assets/images/galleryImage3.png')},
  {id: 9, img: require('../assets/images/galleryImage4.png')},
  {id: 10, img: require('../assets/images/galleryImage5.png')},
  {id: 11, img: require('../assets/images/galleryImage1.png')},
  {id: 12, img: require('../assets/images/galleryImage2.png')},
  {id: 13, img: require('../assets/images/galleryImage3.png')},
  {id: 14, img: require('../assets/images/galleryImage4.png')},
  {id: 15, img: require('../assets/images/galleryImage5.png')},
  {id: 16, img: require('../assets/images/galleryImage1.png')},
  {id: 17, img: require('../assets/images/galleryImage2.png')},
  {id: 18, img: require('../assets/images/galleryImage3.png')},
];

const Gallery: React.FunctionComponent<Props> = ({navigation}) => {
  const renderItem = ({item}: {item: GalleryImg}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(screens.details)}>
        <Image source={item?.img} style={styles.image} />
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
        data={data}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <View style={styles.seprator} />}
      />
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
  container: {paddingVertical: hp(2)},
  image: {height: wp(28.5), width: wp(28.5), borderRadius: wp(9.5)},
  columnWrapper: {justifyContent: 'space-between'},
  seprator: {height: hp(1.5)},
});
