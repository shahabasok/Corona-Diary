import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused} from '@react-navigation/native';

import asyncStorageFunction from '../../../lib/asyncStorage.lib';
import validate from './../../validations/validate';

import styles from './profile.style';

export default function ProfileComponent({navigation}) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    _fetchDetails();
  }, [isFocused]);

  const _fetchDetails = async () => {
    let fullName = await asyncStorageFunction.retrieveData('fullName');
    let phone = await asyncStorageFunction.retrieveData('phone');
    let address = await asyncStorageFunction.retrieveData('address');
    setFullName(fullName);
    setPhone(phone);
    setAddress(address);
  };

  const navigateToDashboard = async () => {
    let data = {
      firstName: fullName,
      phone: phone,
      address: address,
    };
    const {errors, isValid} = validate.checkRegistration(data);

    if (!isValid) {
      let errorString = '';
      for (let i in errors) {
        errorString = errorString + errors[i] + '\n';
        if (i == errors.length - 1) {
          Alert.alert(
            'Please fill fields',
            errorString,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        }
      }
    } else {
      await asyncStorageFunction.storeData('fullName', fullName);
      await asyncStorageFunction.storeData('phone', phone);
      await asyncStorageFunction.storeData('address', address);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.headerNavigationContainer}>
        <Text style={{color: 'white', fontSize: wp('4%')}}>Your</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{color: 'white', fontSize: wp('8%'), fontWeight: 'bold'}}>
            Profile
          </Text>
        </View>
      </View>
      <View style={styles.userProfileContainer}>
        <View>
          <Image source={require('./../../../../assets/images/user.png')} />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <TextInput
              name="email"
              label="Username"
              style={styles.input}
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              value={fullName}
              autoCorrect={false}
              maxLength={30}
              placeholder="Full Name"
              placeholderTextColor="black"
              onChangeText={fullName => {
                setFullName(fullName);
              }}
            />
          </View>
          <View style={{paddingTop: hp('2%')}}>
            <TextInput
              name="email"
              label="Password"
              style={styles.input}
              keyboardType="numeric"
              returnKeyType="next"
              autoCapitalize="none"
              value={phone}
              inlineImageLeft="mail"
              autoCorrect={false}
              maxLength={10}
              placeholder="Mobile"
              placeholderTextColor="black"
              onChangeText={phone => {
                setPhone(phone);
              }}
            />
          </View>
          <View style={{paddingTop: hp('2%')}}>
            <TextInput
              name="email"
              label="Password"
              style={styles.input1}
              returnKeyType="next"
              autoCapitalize="none"
              multiline={true}
              value={address}
              inlineImageLeft="mail"
              autoCorrect={false}
              secureTextEntry={true}
              maxLength={70}
              placeholder="Address"
              placeholderTextColor="black"
              onChangeText={address => {
                setAddress(address);
              }}
              onSubmitEditing={() => NaviagteToDashboard()}
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
        <TouchableOpacity
          onPress={() => navigateToDashboard()}
          style={{
            width: wp('75%'),
            backgroundColor: '#FFB301',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{color: 'white', textAlign: 'center', fontSize: wp('5%')}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
