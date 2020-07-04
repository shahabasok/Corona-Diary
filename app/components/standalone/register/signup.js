import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './signup.style';

export default function SignUpComponent({navigation}) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
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

  const NavigateToSuccess = () => {
    navigation.navigate('Success');
  };

  const NavigateToVehicleRegistration = () => {
    navigation.navigate('Vehicle');
  };

  return (
    <View style={styles.fullScreen}>
      <View style={{flexDirection: 'row-reverse'}}>
        <Text
          style={{
            color: '#23FE65',
            fontSize: wp('8%'),
            fontWeight: 'bold',
          }}>
          02
          <Text
            style={{
              color: 'white',
              fontSize: wp('6%'),
              fontWeight: 'bold',
            }}>
            /02
          </Text>
        </Text>
      </View>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: wp('4%')}}>Do you</Text>
        <Text style={{color: 'white', fontSize: wp('8%'), fontWeight: 'bold'}}>
          have a Vehicle?
        </Text>
        <Text style={{color: 'white', fontSize: wp('4%')}}>
          This data will be accessed to let people you
        </Text>
        <Text style={{color: 'white', fontSize: wp('4%')}}>
          meet know that you used a vehicle recently
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{right: 10}}>
            <TouchableOpacity
              onPress={() => NavigateToSuccess()}
              style={{
                width: wp('30%'),
                padding: 8,
                borderColor: 'white',
                borderWidth: 2,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: wp('5%'),
                }}>
                No
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{left: 10}}>
            <TouchableOpacity
              onPress={() => NavigateToVehicleRegistration()}
              style={{
                width: wp('30%'),
                backgroundColor: '#FFB301',
                padding: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: wp('5%'),
                }}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
