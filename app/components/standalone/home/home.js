import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import QRCode from 'react-native-qrcode-svg';
import asyncStorageFunction from './../../../lib/asyncStorage.lib';
import {useIsFocused} from '@react-navigation/native';

import styles from './home.style';

export default function HomeComponent({navigation}) {
  const [qrCodeText, setQrCodeText] = useState('No data found');
  const [userName, setuserName] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    _fetchDetails();
  }, [isFocused]);

  const _fetchDetails = async () => {
    let fullName = await asyncStorageFunction.retrieveData('fullName');
    let phone = await asyncStorageFunction.retrieveData('phone');
    let address = await asyncStorageFunction.retrieveData('address');
    let vehNum = await asyncStorageFunction.retrieveData('vehNum');

    setuserName(fullName);

    if (vehNum == false) {
      let qrData = {
        firstName: fullName,
        phone: phone,
        address: address,
        vehicleReg: '',
      };

      setQrCodeText(JSON.stringify(qrData));
    } else {
      let qrData = {
        firstName: fullName,
        phone: phone,
        address: address,
        vehicleReg: vehNum,
      };

      setQrCodeText(JSON.stringify(qrData));
    }
  };

  const NavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.fullScreen}>
      <View
        style={{
          flex: 1,
          paddingTop: hp('2%'),
          paddingHorizontal: wp('5%'),
        }}>
        <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
          <View>
            <TouchableOpacity onPress={() => NavigateToProfile()}>
              <Image source={require('./../../../../assets/images/user.png')} />
            </TouchableOpacity>
          </View>
          <View style={{left: 10, justifyContent: 'center'}}>
            <Text
              style={{
                textAlign: 'left',
                color: 'white',
                fontSize: wp('5%'),
              }}>
              Hi,
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: wp('5%'),
                fontWeight: 'bold',
              }}>
              {userName}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 4,
          justifyContent: 'center',
          backgroundColor: 'white',
          left: wp('5%'),
          width: wp('90%'),
          borderRadius: 30,
          bottom: hp('5%'),
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: wp('10%'),
          }}>
          <Text style={{fontSize: wp('4%'), color: '#4B92E0'}}>
            Show this QR code to
          </Text>
          <Text
            style={{fontSize: wp('6%'), fontWeight: 'bold', color: '#4B92E0'}}>
            Share Your Details
          </Text>
        </View>
        <View style={{flex: 3, alignItems: 'center'}}>
          <QRCode
            value={qrCodeText}
            size={wp('70%')}
            color="#000000"
            backgroundColor="white"
          />
        </View>
      </View>
    </View>
  );
}
