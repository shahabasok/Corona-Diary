import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './success.style';

export default function SuccessComponent({navigation}) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const NavigateToHome = () => {
    navigation.navigate('ExistingUser');
  };

  return (
    <View style={styles.fullScreen}>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').width * 0.5,
            borderRadius:
              Math.round(
                Dimensions.get('window').width +
                  Dimensions.get('window').height,
              ) / 2,
            backgroundColor: '#27BBB9',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.4,
              height: Dimensions.get('window').width * 0.4,
              borderRadius:
                Math.round(
                  Dimensions.get('window').width +
                    Dimensions.get('window').height,
                ) / 2,
              backgroundColor: '#0AF29D',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={'check'}
              color={'white'}
              size={Dimensions.get('window').width * 0.2}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: wp('8%'), fontWeight: 'bold'}}>
          Great !
        </Text>
        <Text style={{color: 'white', fontSize: wp('6%')}}>
          Now you can keep track of
        </Text>
        <Text style={{color: 'white', fontSize: wp('6%')}}>
          your movement and keep
        </Text>
        <Text style={{color: 'white', fontSize: wp('6%')}}>everyone safe.</Text>
      </View>
      <View
        style={{
          flex: 1,
          // justifyContent: 'flex-end',
          // marginBottom: hp('5%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => NavigateToHome()}
          style={{
            width: wp('75%'),
            backgroundColor: '#FFB301',
            padding: 15,
            borderRadius: 10,
          }}>
          <Text
            style={{color: 'white', textAlign: 'center', fontSize: wp('5%')}}>
            Finish
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
