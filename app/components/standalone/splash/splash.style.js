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
  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poweredByContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  breakTheChainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
