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
  headerNavigationContainer: {
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  input: {
    color: '#000000',
    width: wp('75%'),
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  input1: {
    color: '#000000',
    width: wp('75%'),
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  disabled: {
    width: wp('75%'),
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
  },
  buttonWrapper: {
    width: wp('75%'),
    backgroundColor: '#FFB301',
    padding: 10,
    borderRadius: 10,
  },
  disabledDate: {
    width: wp('35%'),
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
  },
  buttonWrapperDisabled: {
    width: wp('35%'),
    backgroundColor: '#FFB301',
    padding: 10,
    borderRadius: 10,
  },
});
