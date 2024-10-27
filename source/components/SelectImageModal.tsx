import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import React from 'react';
import AppText from './AppText';
import ImagePicker from 'react-native-image-crop-picker';
import images from '../themes/images';
import CustomButton from './CustomButton';
import colors from '../themes/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ABeeZee} from '../themes/fonts';

let selectImageModalTitle = 'Select image from';
let camera = 'CAMERA';
let gallery = 'GALLERY';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (image: any) => void;
};

const SelectImageModal = ({isVisible, onClose, onSelect}: Props) => {
  const openImageCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      var type = image.mime;
      var uri = image.path;
      var patt = /\w+[-\w+\s]*\.(jpg|png|jpeg)/g;
      var name = image.path.match(patt);
      const _image = {uri, type, name: name[0]};
      onSelect(_image);
      onClose();
    });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      var type = image.mime;
      var uri = image.path;
      var patt = /\w+[-\w+\s]*\.(jpg|png|jpeg)/g;
      var name = image.path.match(patt);
      const _image = {uri, type, name: name[0]};
      onSelect(_image);
      onClose();
    });
  };

  return (
    <Modal
      statusBarTranslucent
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable onPress={onClose} style={{flex: 1}} />
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
            <Image style={styles.closeIcon} source={images.close} />
          </TouchableOpacity>
          <AppText
            align={'center'}
            label={selectImageModalTitle}
            size={'large'}
            color={colors.black}
            fontFamily={ABeeZee.regular}
            textStyles={{marginTop: hp(1)}}
          />
          <View style={styles.btnContainerMain}>
            <CustomButton
              title={camera}
              onPress={openImageCamera}
              containerStyle={styles.btnContainer}
              bgColor={colors.philippineBronzeOP99}
            />
            <CustomButton
              title={gallery}
              onPress={openGallery}
              containerStyle={styles.btnContainer}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectImageModal;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.modalBackground},
  innerContainer: {
    backgroundColor: colors.white,
    borderTopStartRadius: wp(7),
    borderTopEndRadius: wp(7),
    paddingHorizontal: wp(5),
  },
  closeContainer: {
    marginTop: hp(2.2),
    alignSelf: 'flex-end',
  },
  closeIcon: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
  btnContainerMain: {
    marginTop: hp(4),
    marginBottom: hp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {width: wp(43)},
});
