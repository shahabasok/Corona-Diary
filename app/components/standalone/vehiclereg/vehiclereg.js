import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import asyncStorageFunction from './../../../lib/asyncStorage.lib';
import validate from './../../validations/validate';

import styles from './vehiclereg.style';

export default function VehicleRegComponent({navigation}) {
  const [vehicleReg, setVehicleReg] = useState('');

  const NavigateToHome = async () => {
    let data = {
      regNum: vehicleReg,
    };

    const {errors, isValid} = validate.checkVehicleReg(data);

    if (!isValid) {
      let errorString = '';
      for (let i in errors) {
        errorString = errorString + errors[i] + '\n';
        if (i == errors.length - 1) {
          Alert.alert(
            'Error !!',
            errorString,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        }
      }
    } else {
      await asyncStorageFunction.storeData('vehNum', vehicleReg);
      navigation.navigate('Success');
    }
  };
  return (
    <View style={styles.fullScreen}>
      <StatusBar
        backgroundColor="#3A77CC"
        barStyle="light-content"
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <View
        style={{
          flex: 1,
          paddingTop: hp('5%'),
          flexDirection: 'row-reverse',
          paddingHorizontal: wp('5%'),
        }}>
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
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          paddingHorizontal: wp('10%'),
        }}>
        <View>
          <Text style={{color: 'white', fontSize: wp('6%')}}>
            Enter your vehicle
          </Text>
          <Text
            style={{color: 'white', fontSize: wp('8%'), fontWeight: 'bold'}}>
            Registration number.
          </Text>
        </View>
        <View>
          <TextInput
            name="email"
            label="Password"
            style={styles.input}
            returnKeyType="next"
            autoCapitalize="none"
            multiline={true}
            value={vehicleReg}
            inlineImageLeft="mail"
            autoCorrect={false}
            secureTextEntry={true}
            maxLength={30}
            placeholder="Vehicle Number"
            placeholderTextColor="black"
            onChangeText={vehicleReg => {
              setVehicleReg(vehicleReg);
            }}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
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
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
