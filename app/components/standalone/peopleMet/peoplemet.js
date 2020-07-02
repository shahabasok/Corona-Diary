import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import asyncStorageFunction from '../../../lib/asyncStorage.lib';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './peoplemet.style';

export default function PeopleMetComponent({navigation}) {
  const [peopleMetData, setPeopleMetData] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    _retrievePeopleMetData();
  }, [isFocused]);

  const _retrievePeopleMetData = async () => {
    let peopleData = await asyncStorageFunction.retrieveData('peopleYouMet');

    if (peopleData == false) {
      setPeopleMetData('');
    } else {
      let dataToDisplay = JSON.parse(peopleData);
      setPeopleMetData(dataToDisplay);
    }
  };

  return (
    <View style={styles.fullScreen}>
      <FlatList
        data={peopleMetData}
        renderItem={({item}) => (
          <View style={{paddingHorizontal: wp('5%')}}>
            <Text
              style={{
                color: 'white',
                fontSize: wp('6%'),
              }}>
              {item.firstName}
            </Text>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'map-marker'} color={'white'} size={wp('5%')} />
                <Text
                  style={{
                    color: 'white',
                    fontSize: wp('4%'),
                    width: wp('40%'),
                  }}>
                  {item.address}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: wp('4%'),
                  }}>
                  {item.Date}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: wp('4%'),
                  }}>
                  {item.Time}
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
    </View>
  );
}
