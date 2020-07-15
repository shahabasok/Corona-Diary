import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useIsFocused} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './scanner.style';
import asyncStorageFunction from '../../../lib/asyncStorage.lib';

export default function ScannerComponent({navigation}) {
  const [showCamera, setShowCamera] = useState(true);
  const [scannedData, setScannedData] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    setShowCamera(true);
  }, [isFocused]);

  const onSuccess = QrCodeDta => {
    try {
      var scannedJSON = JSON.parse(QrCodeDta.data);
      if (
        scannedJSON.hasOwnProperty('firstName') == true &&
        scannedJSON.hasOwnProperty('phone') == true &&
        scannedJSON.hasOwnProperty('address') == true &&
        scannedJSON.hasOwnProperty('vehicleReg') == true
      ) {
        if (
          scannedJSON.firstName.length <= 40 &&
          scannedJSON.phone.length == 10 &&
          scannedJSON.address.length <= 70 &&
          scannedJSON.vehicleReg.length <= 13
        ) {
          var date = Date.now();
          var d = new Date(date);

          scannedJSON['Date'] = d.toDateString();
          scannedJSON['Time'] = d.toLocaleTimeString();

          setScannedData(scannedJSON);
          setShowCamera(false);
        } else {
          Alert.alert(
            'Wrong QR code',
            'Seems like you have scanned a wrong QR Code... \nPlease try again',
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        }
      } else {
        Alert.alert(
          'Wrong QR code',
          'Seems like you have scanned a wrong QR Code... \n Please try again',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (error) {
      Alert.alert(
        'Wrong QR code',
        'Seems like you have scanned a wrong QR Code... \n Please try again',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    }
  };

  const handleCancel = () => {
    setScannedData('');
    setShowCamera(true);
  };

  const handleFinish = async () => {
    let previousData = await asyncStorageFunction.retrieveData('peopleYouMet');

    if (previousData == false) {
      var dataArray = [];
      dataArray.push(scannedData);
      let dataToSave = JSON.stringify(dataArray);
      await asyncStorageFunction.storeData('peopleYouMet', dataToSave);
      setScannedData('');
      navigation.goBack();
    } else {
      var previousJSON = JSON.parse(previousData);

      previousJSON.unshift(scannedData);

      var updatedData = JSON.stringify(previousJSON);

      await asyncStorageFunction.storeData('peopleYouMet', updatedData);

      setScannedData('');
      setShowCamera(true);
      navigation.navigate('Location', {Screen: 'People You Met'});
    }
  };

  return (
    <View style={styles.fullScreen}>
      {showCamera && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <QRCodeScanner
            onRead={e => onSuccess(e)}
            showMarker={true}
            reactivate={true}
            reactivateTimeout={6000}
          />
        </View>
      )}
      {!showCamera && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4B92E0',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: Dimensions.get('window').width * 0.25,
                height: Dimensions.get('window').width * 0.25,
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
                  width: Dimensions.get('window').width * 0.2,
                  height: Dimensions.get('window').width * 0.2,
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
            <Text
              style={{
                color: 'white',
                fontSize: wp('7%'),
                fontWeight: 'bold',
                left: 10,
              }}>
              Scan Complete
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('./../../../../assets/images/user.png')} />
              <Text
                style={{
                  color: 'white',
                  fontSize: wp('6%'),
                  fontWeight: 'bold',
                }}>
                {scannedData.firstName}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: wp('10%'),
              }}>
              <Icon name={'map-marker'} color={'white'} size={wp('10%')} />
              <Text
                style={{
                  color: 'white',
                  fontSize: wp('6%'),
                }}>
                Current Location
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp('7%'),
                  textAlign: 'center',
                }}>
                {scannedData.address}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{right: 10}}>
                <TouchableOpacity
                  onPress={() => handleCancel()}
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
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{left: 10}}>
                <TouchableOpacity
                  onPress={() => handleFinish()}
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
                    Finish
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
