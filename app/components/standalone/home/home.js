import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import QRCode from 'react-native-qrcode-svg';

import styles from './home.style';

export default function HomeComponent({navigation}) {
  const [qrCodeText, setQrCodeText] = useState(
    'Mohammed Shahabas, Full Stack Developer',
  );
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
          Jake James
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
