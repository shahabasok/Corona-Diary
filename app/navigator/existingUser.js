import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HomeComponent from './../components/standalone/home/home';
import ScannerComponent from './../components/standalone/scanner/scanner';
import MyRouteComponent from './../components/standalone/myRoute/myroute';
import PeopleMetComponent from './../components/standalone/peopleMet/peoplemet';

const LocationStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

function LocationStackScreen() {
  return (
    <TopTabs.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        indicatorStyle: {backgroundColor: '#FFB301'},
        style: {backgroundColor: '#4B92E0'},
      }}>
      <Tab.Screen name="Your Route Map" component={MyRouteComponent} />
      <Tab.Screen name="People You Met" component={PeopleMetComponent} />
    </TopTabs.Navigator>
  );
}

export const ExistingUserStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#327BCD"
        barStyle={{backgroundColor: 'white'}}>
        <Tab.Screen
          name="Home"
          component={HomeComponent}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <Icon name={'home'} color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Sanner"
          component={ScannerComponent}
          options={{
            tabBarLabel: 'Scanner',
            tabBarIcon: ({color}) => (
              <Icon name={'qrcode-scan'} color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Location"
          component={LocationStackScreen}
          options={{
            tabBarLabel: 'Locations',
            tabBarIcon: ({color}) => (
              <Icon name={'map-marker'} color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
