import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import styles from './myroute.style';

export default function MyRouteComponent({navigation}) {
  return (
    <View style={styles.fullScreen}>
      <Text>My Route screen</Text>
    </View>
  );
}
