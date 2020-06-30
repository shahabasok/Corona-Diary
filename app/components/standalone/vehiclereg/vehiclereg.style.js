import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#4B92E0',
  },
  input: {
    color: 'white',
    width: wp('75%'),
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
});
