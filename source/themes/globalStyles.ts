import {Platform, StatusBar} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default {
  marginTopStatusBar:
    Platform.OS === 'android' ? StatusBar.currentHeight || hp(4.5) : hp(4.7),
  screenPadding: wp(4.5),
};
