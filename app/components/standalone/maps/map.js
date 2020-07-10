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
import MapView, {PROVIDER_GOOGLE, Circle} from 'react-native-maps';

import styles from './map.style';

export default function MapComponent({route, navigation}) {
  const [latitude, setlatitude] = useState(10.978194);
  const [longitude, setlongitude] = useState(76.227164);

  useEffect(() => {
    let address = route.params.address;
    var str = address.split(',');
    var lat = parseFloat(str[0]);
    var lng = parseFloat(str[1]);

    setlatitude(lat);
    setlongitude(lng);
  }, []);

  return (
    <View style={styles.fullScreen}>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        showsUserLocation={true}
        initialRegion={{
          latitude: 10.978194,
          longitude: 76.227164,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}>
        <MapView.Marker
          coordinate={{latitude: latitude, longitude: longitude}}
          pinColor={'red'}
          title={'Your Location'}
        />
      </MapView>
    </View>
  );
}
