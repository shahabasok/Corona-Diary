import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import QRCode from 'react-native-qrcode-svg';
import asyncStorageFunction from './../../../lib/asyncStorage.lib';

import styles from './home.style';

export default function HomeComponent({navigation}) {
  const [qrCodeText, setQrCodeText] = useState('No data found');
  const [userName, setuserName] = useState('');

  useEffect(() => {
    _fetchDetails();
  }, []);

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

  return (
    <View style={styles.fullScreen}>
      <View
        style={{
          flex: 1,
          paddingTop: hp('2%'),
          paddingHorizontal: wp('5%'),
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: wp('6%'),
          }}>
          Hi,
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: wp('6%'),
            fontWeight: 'bold',
          }}>
          {userName}
        </Text>
      </View>
      <View
        style={{
          flex: 4,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          left: wp('5%'),
          width: wp('90%'),
          borderRadius: 30,
          bottom: hp('5%'),
        }}>
        <View>
          <QRCode
            value={qrCodeText}
            size={wp('70%')}
            color="black"
            backgroundColor="white"
          />
        </View>
        <View style={{top: hp('3%')}}>
          <Text>Scan QR code to get the Details</Text>
        </View>
      </View>
    </View>
  );
}
