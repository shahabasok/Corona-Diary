import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './scanner.style';

export default function ScannerComponent({navigation}) {
  const onSuccess = data => {
    console.log(data);
  };
  return (
    <View style={styles.fullScreen}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <QRCodeScanner
          onRead={e => onSuccess(e)}
          showMarker={true}
          reactivate={true}
          reactivateTimeout={3000}
        />
      </View>
    </View>
  );
}
