import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import asyncStorageFunction from './../../../lib/asyncStorage.lib';
import styles from './splash.style';

export default function Splash({navigation}) {
  useEffect(() => {
    _LoginCheck();
  }, []);

  const _LoginCheck = async () => {
    const data = await asyncStorageFunction.retrieveData('fullName');
    if (data == false) {
      setTimeout(() => {
        navigation.navigate('UserStack');
      }, 1000);
    } else {
      setTimeout(() => {
        navigation.navigate('ExistingUser');
      }, 1000);
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.headerContainer}>
        <Text style={{color: 'white', fontSize: wp('12%')}}>Covid</Text>
        <Text style={{color: 'white', fontSize: wp('15%'), fontWeight: 'bold'}}>
          Track
        </Text>
      </View>
      <View style={styles.poweredByContainer}>
        <Text
          style={{color: 'white', fontSize: wp('5%'), lineHeight: hp('5%')}}>
          P O W E R E D B Y
        </Text>
        <Image source={require('./../../../../assets/images/poweredBy.png')} />
      </View>
      <View style={styles.breakTheChainContainer}>
        <Text
          style={{color: 'white', fontSize: wp('4%'), lineHeight: hp('5%')}}>
          A '<Text style={{fontWeight: 'bold'}}>Break The Chain</Text>'
          Initiative
        </Text>
        <Image
          source={require('./../../../../assets/images/breakTheChain.png')}
        />
      </View>
    </View>
  );
}
