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

import asyncStorageFunction from './../../../lib/asyncStorage.lib';
import styles from './login.style';

export default function LoginComponent({navigation}) {
  const navigateToDashboard = () => {
    navigation.navigate('ExistingUser');
  };
  return (
    <View style={styles.fullScreen}>
      <View>
        <StatusBar
          backgroundColor="#3A77CC"
          barStyle="light-content"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
      </View>
      <View style={styles.headerNavigationContainer}>
        <Text style={{color: 'white', fontSize: wp('4%')}}>Let's get</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{color: 'white', fontSize: wp('8%'), fontWeight: 'bold'}}>
            Registered
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
              /02
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
              // value={username}
              autoCorrect={false}
              maxLength={30}
              // autoFocus={true}
              placeholder="Full Name"
              placeholderTextColor="black"
              // onChangeText={(username) => {
              //   setUsername(username);
              // }}
              // onSubmitEditing={() => {
              //   passwordInput.focus();
              // }}
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
              // value={password}
              inlineImageLeft="mail"
              autoCorrect={false}
              maxLength={30}
              placeholder="Mobile"
              placeholderTextColor="black"
              // ref={(input) => (this.passwordInput = input)}
              // onChangeText={(password) => {
              //   setPassword(password);
              // }}
              // onSubmitEditing={() => NaviagteToDashboard()}
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
              // value={password}
              inlineImageLeft="mail"
              autoCorrect={false}
              secureTextEntry={true}
              maxLength={30}
              placeholder="Address"
              placeholderTextColor="black"
              // ref={(input) => (this.passwordInput = input)}
              // onChangeText={(password) => {
              //   setPassword(password);
              // }}
              // onSubmitEditing={() => NaviagteToDashboard()}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          // justifyContent: 'flex-end',
          // marginBottom: hp('5%'),
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
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
