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

import styles from './addpeople.style';

export default function AddPeopleComponent({navigation}) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

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
      let previousData = await asyncStorageFunction.retrieveData(
        'peopleYouMet',
      );

      if (previousData == false) {
        var dataArray = [];

        var date = Date.now();
        var d = new Date(date);

        data['Date'] = d.toDateString();
        data['Time'] = d.toLocaleTimeString();
        dataArray.push(data);
        let dataToSave = JSON.stringify(dataArray);
        await asyncStorageFunction.storeData('peopleYouMet', dataToSave);
        navigation.goBack();
      } else {
        var previousJSON = JSON.parse(previousData);

        var date = Date.now();
        var d = new Date(date);

        data['Date'] = d.toDateString();
        data['Time'] = d.toLocaleTimeString();

        previousJSON.unshift(data);

        var updatedData = JSON.stringify(previousJSON);

        await asyncStorageFunction.storeData('peopleYouMet', updatedData);

        navigation.goBack();
      }
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.headerNavigationContainer}>
        <Text style={{color: 'white', fontSize: wp('4%')}}>Let's add a</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{color: 'white', fontSize: wp('8%'), fontWeight: 'bold'}}>
            Person You Met
          </Text>
          <Text
            style={{
              color: '#23FE65',
              fontSize: wp('8%'),
              fontWeight: 'bold',
            }}>
            01
            <Text
              style={{
                color: 'white',
                fontSize: wp('6%'),
                fontWeight: 'bold',
              }}>
              /01
            </Text>
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
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
