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
    flex: 1,
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  userProfileContainer: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    color: 'black',
    width: wp('75%'),
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  input1: {
    color: 'black',
    width: wp('75%'),
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
});
