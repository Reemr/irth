import {Platform, StatusBar} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  marginTopStatusBar:
    Platform.OS === 'android' ? StatusBar.currentHeight : hp(4.5),
};
