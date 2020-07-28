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
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';
import DateTimePicker from '@react-native-community/datetimepicker';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {RadioButton} from 'react-native-paper';

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
      showActivityIndicator: false,
      manualExpanded: false,
      expanded: true,
      disableManualButton: true,
      disbaleAutoButton: false,
      checked: 'first',
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
    console.log(event.type);
    if (event.type == 'set') {
      const currentDate = selectedDate || date;

      var d = new Date(currentDate);

      this.setState({
        dateChosen: d.toDateString(),
        timeChosen: d.toLocaleTimeString(),
        date: currentDate,
        show: false,
      });
    } else if (event.type == 'dismissed') {
      this.setState({
        dateChosen: '',
        timeChosen: '',
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
           Sahayi wants to access your location </font>",
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
                Alert.alert('Oops..', 'Unable to fetch your Geolocation..', [
                  {
                    onPress: () => null,
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {},
                  },
                ]);
              }
            },
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 1000},
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

  handlePress = () => {
    this.setState({
      expanded: !this.state.expanded,
      manualExpanded: this.state.expanded,
      disableManualButton: !this.state.expanded,
      disbaleAutoButton: this.state.expanded,
      checked: this.state.expanded ? 'second' : 'first',
    });
  };

  handleManualPress = () => {
    this.setState({
      manualExpanded: !this.state.manualExpanded,
      expanded: this.state.manualExpanded,
      disableManualButton: this.state.manualExpanded,
      disbaleAutoButton: !this.state.manualExpanded,
      checked: this.state.manualExpanded ? 'first' : 'second',
    });
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
        <ScrollView>
          <View style={{justifyContent: 'center', paddingVertical: hp('5%')}}>
            <View style={{paddingHorizontal: wp('5%')}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <RadioButton
                    value="first"
                    color={'#23FE65'}
                    status={
                      this.state.checked === 'first' ? 'checked' : 'unchecked'
                    }
                    onPress={() => this.handlePress()}
                  />
                </View>
                <View>
                  <Text style={{color: 'white', fontSize: wp('5%')}}>
                    Save My Current Location
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp('8%'),
                  fontWeight: 'bold',
                }}>
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
                disabled={this.state.disbaleAutoButton}
                onPress={() => this.fetchLocation()}
                style={
                  this.state.disbaleAutoButton
                    ? styles.disabled
                    : styles.buttonWrapper
                }>
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
          <View style={{paddingVertical: hp('2%')}}>
            <Text
              style={{
                fontSize: wp('5%'),
                color: '#808080',
                textAlign: 'center',
              }}>
              ____________________________
            </Text>
          </View>
          <View style={{justifyContent: 'center', paddingVertical: hp('5%')}}>
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <RadioButton
                    value="second"
                    color={'#23FE65'}
                    status={
                      this.state.checked === 'second' ? 'checked' : 'unchecked'
                    }
                    onPress={() => this.handleManualPress()}
                  />
                </View>
                <View>
                  <Text style={{color: 'white', fontSize: wp('5%')}}>
                    Add My Location Details
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp('8%'),
                  fontWeight: 'bold',
                }}>
                Manually
              </Text>
            </View>
            <View
              style={{justifyContent: 'space-around', alignItems: 'center'}}>
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
                  placeholderTextColor="#000000"
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
                    disabled={this.state.disableManualButton}
                    onPress={() => this.showDatepicker()}
                    style={
                      this.state.disableManualButton
                        ? styles.disabledDate
                        : styles.buttonWrapperDisabled
                    }>
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
                    disabled={this.state.disableManualButton}
                    onPress={() => this.showTimepicker()}
                    style={
                      this.state.disableManualButton
                        ? styles.disabledDate
                        : styles.buttonWrapperDisabled
                    }>
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
                  disabled={this.state.disableManualButton}
                  onPress={() => this.saveLocation()}
                  style={
                    this.state.disableManualButton
                      ? styles.disabled
                      : styles.buttonWrapper
                  }>
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
        </ScrollView>
      </View>
    );
  }
}
