import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import asyncStorageFunction from '../../../lib/asyncStorage.lib';

import styles from './myroute.style';

export default function MyRouteComponent({navigation}) {
  const [myRoute, setMyRoute] = useState('');
  const [showEmptyMessage, setShowEmptyMessage] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    _retrievePeopleMetData();
  }, [isFocused]);

  const _retrievePeopleMetData = async () => {
    let myRouteData = await asyncStorageFunction.retrieveData('myLocations');

    console.log(myRouteData);

    if (myRouteData == false) {
      setMyRoute('');
      setShowEmptyMessage(true);
    } else {
      setShowEmptyMessage(false);
      let dataToDisplay = JSON.parse(myRouteData);
      setMyRoute(dataToDisplay);
    }
  };

  const addMyLocation = () => {
    navigation.navigate('MyLocation');
  };

  return (
    <View style={styles.fullScreen}>
      {showEmptyMessage && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontSize: wp('7%'),
            }}>
            No Data Found !!
          </Text>
        </View>
      )}
      <FlatList
        data={myRoute}
        renderItem={({item}) => (
          <View style={{paddingHorizontal: wp('5%')}}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 5,
                }}>
                <Icon name={'map-marker'} color={'white'} size={wp('5%')} />
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: wp('4%'),
                      width: wp('40%'),
                    }}>
                    {item.address}
                  </Text>
                </View>
              </View>

              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: wp('4%'),
                  }}>
                  {item.date}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: wp('4%'),
                  }}>
                  {item.time}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: 'white',
                borderBottomWidth: 1,
                paddingTop: 10,
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={() => addMyLocation()} style={styles.fab}>
        <Icon
          name={'plus'}
          color={'white'}
          size={Dimensions.get('window').width * 0.15}
        />
      </TouchableOpacity>
    </View>
  );
}
