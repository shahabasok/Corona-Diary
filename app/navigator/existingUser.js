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
import AddPeopleComponent from './../components/standalone/addPeople/addpeople';
import ProfileComponent from './../components/standalone/profile/profile';
import MyLocationComponent from './../components/standalone/myLocation/mylocation';

const Tab = createMaterialBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={HomeComponent} />
      <HomeStack.Screen name="AddPeople" component={AddPeopleComponent} />
      <HomeStack.Screen name="Profile" component={ProfileComponent} />
    </HomeStack.Navigator>
  );
}

const ScannerStack = createStackNavigator();

function ScannerStackScreen() {
  return (
    <ScannerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ScannerStack.Screen name="Scanner" component={ScannerComponent} />
      <ScannerStack.Screen name="AddPeople" component={AddPeopleComponent} />
    </ScannerStack.Navigator>
  );
}

const LocationStack = createStackNavigator();

function LocationStackScreen() {
  return (
    <LocationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LocationStack.Screen name="Location" component={Locations} />
      <LocationStack.Screen name="AddPeople" component={AddPeopleComponent} />
      <LocationStack.Screen name="MyLocation" component={MyLocationComponent} />
    </LocationStack.Navigator>
  );
}

function Locations() {
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
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <Icon name={'home'} color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={ScannerStackScreen}
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
