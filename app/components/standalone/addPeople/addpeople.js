import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import asyncStorageFunction from './../../../lib/asyncStorage.lib';
import styles from './addpeople.style';

export default function AddPeopleComponent({navigation}) {
  return (
    <View style={styles.fullScreen}>
      <Text>from add People</Text>
    </View>
  );
}
