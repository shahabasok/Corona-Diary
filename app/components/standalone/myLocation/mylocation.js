import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  BackHandler,
  DeviceEventEmitter,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';
import DateTimePicker from '@react-native-community/datetimepicker';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

import asyncStorageFunction from './../../../lib/asyncStorage.lib';
import validate from './../../validations/validate';

import styles from './mylocation.style';

export default class MyLocationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'date',
      show: false,
      date: Date.now(),
      dateChosen: '',
      timeChosen: '',
      address: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      LocationServicesDialogBox.forceCloseDialog();
    });

    DeviceEventEmitter.addListener('locationProviderStatusChange', function(
      status,
    ) {
      console.log(status);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
  }

  onChange = (event, selectedDate) => {
    if (event.type == 'set') {
      const currentDate = selectedDate || date;

      var d = new Date(currentDate);

      this.setState({
        dateChosen: d.toDateString(),
        timeChosen: d.toLocaleTimeString(),
        date: currentDate,
        show: false,
      });
    }
  };

  showMode = currentMode => {
    this.setState({
      show: true,
      mode: currentMode,
    });
  };

  showDatepicker = () => {
    this.setState({
      show: true,
      mode: 'date',
    });
  };

  showTimepicker = () => {
    this.setState({
      show: true,
      mode: 'time',
    });
  };

  saveLocation = async () => {
    let data = {
      address: this.state.address,
      date: this.state.dateChosen,
      time: this.state.timeChosen,
      type: 'manual',
    };

    const {errors, isValid} = validate.checkLocationData(data);

    if (!isValid) {
      let errorString = '';
      for (let i in errors) {
        errorString = errorString + errors[i] + '\n';
        if (i == errors.length - 1) {
          Alert.alert(
            'Please fill in all details',
            errorString,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        }
      }
    } else {
      let previousData = await asyncStorageFunction.retrieveData('myLocations');

      if (previousData == false) {
        var dataArray = [];

        dataArray.push(data);

        let dataToSave = JSON.stringify(dataArray);
        await asyncStorageFunction.storeData('myLocations', dataToSave);
        this.props.navigation.goBack();
      } else {
        var previousJSON = JSON.parse(previousData);

        previousJSON.unshift(data);

        var updatedData = JSON.stringify(previousJSON);

        await asyncStorageFunction.storeData('myLocations', updatedData);

        this.props.navigation.goBack();
      }
    }
  };

  fetchLocation = async () => {
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<font color='#ffffff'><b>Use GPS Location?</b><br></br> \
           Covid Diary wants to access your location </font>",
        ok: 'YES',
        cancel: 'NO',
        style: {
          backgroundColor: '#4B92E0',
          positiveButtonTextColor: '#f2ca6b',
          negativeButtonTextColor: 'white',
        },
      })
        .then(async () => {
          Geolocation.getCurrentPosition(
            async initialPosition => {
              var lat = initialPosition.coords.latitude;
              var lng = initialPosition.coords.longitude;

              var date = Date.now();
              var d = new Date(date);
              let previousData = await asyncStorageFunction.retrieveData(
                'myLocations',
              );

              let data = {
                address: lat + ',' + lng,
                date: d.toDateString(),
                time: d.toLocaleTimeString(),
                type: 'auto',
              };

              if (previousData == false) {
                var dataArray = [];

                dataArray.push(data);

                let dataToSave = JSON.stringify(dataArray);
                await asyncStorageFunction.storeData('myLocations', dataToSave);
                this.props.navigation.goBack();
              } else {
                var previousJSON = JSON.parse(previousData);

                previousJSON.unshift(data);

                var updatedData = JSON.stringify(previousJSON);

                await asyncStorageFunction.storeData(
                  'myLocations',
                  updatedData,
                );

                this.props.navigation.goBack();
              }
            },
            error => {
              if (error.message === 'Location request timed out') {
                Alert.alert('Hmm..', 'Unable to fetch your Geolocation..', [
                  {
                    onPress: () => null,
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => {}},
                ]);
              }
            },
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
          );
        })
        .catch(() => {
          Alert.alert('Hmm...', 'Unable to fetch your Geolocation..', [
            {
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {}},
          ]);
        });
    }
  };

  render() {
    return (
      <View style={styles.fullScreen}>
        <View style={styles.headerNavigationContainer}>
          <Text style={{color: 'white', fontSize: wp('4%')}}>
            Let's save my
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{color: 'white', fontSize: wp('8%'), fontWeight: 'bold'}}>
              Geolocation
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
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{paddingHorizontal: wp('5%')}}>
            <Text style={{color: 'white', fontSize: wp('5%')}}>
              Save My Current Location
            </Text>
            <Text
              style={{color: 'white', fontSize: wp('8%'), fontWeight: 'bold'}}>
              Automatically
            </Text>
            <Text style={{color: 'white', fontSize: wp('4%')}}>
              NB: For better result please turn on your network
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: hp('2%'),
            }}>
            <TouchableOpacity
              onPress={() => this.fetchLocation()}
              style={{
                width: wp('75%'),
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
                Save My Location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{flex: 0.5, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Text style={{fontSize: wp('7%'), color: 'white'}}>
            - - - OR - - -
          </Text>
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={false}
              display="default"
              onChange={this.onChange}
            />
          )}
          <View style={{paddingHorizontal: wp('5%')}}>
            <Text style={{color: 'white', fontSize: wp('5%')}}>
              Add My Location Details
            </Text>
            <Text
              style={{color: 'white', fontSize: wp('8%'), fontWeight: 'bold'}}>
              Manually
            </Text>
          </View>
          <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
            <View style={{paddingTop: hp('2%')}}>
              <TextInput
                name="email"
                label="Password"
                style={styles.input1}
                returnKeyType="next"
                autoCapitalize="none"
                multiline={true}
                value={this.state.address}
                inlineImageLeft="mail"
                autoCorrect={false}
                secureTextEntry={true}
                maxLength={70}
                placeholder="Place you visited"
                placeholderTextColor="black"
                onChangeText={address => {
                  this.setState({
                    address: address,
                  });
                }}
              />
            </View>
            <View style={{flexDirection: 'row', paddingTop: hp('2%')}}>
              <View style={{right: wp('5%')}}>
                <TouchableOpacity
                  onPress={() => this.showDatepicker()}
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
                    Select Date
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: wp('5%'),
                    }}>
                    Date Selected:
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: wp('5%'),
                    }}>
                    {this.state.dateChosen}
                  </Text>
                </View>
              </View>
              <View style={{left: wp('5%')}}>
                <TouchableOpacity
                  onPress={() => this.showTimepicker()}
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
                    Select Time
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: wp('5%'),
                    }}>
                    Time Selected:
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: wp('5%'),
                    }}>
                    {this.state.timeChosen}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{paddingTop: hp('2%')}}>
              <TouchableOpacity
                onPress={() => this.saveLocation()}
                style={{
                  width: wp('75%'),
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
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}