/**
 * @fileoverview Stack for already existing user.
 * @author Mohammed Shahabas
 */

import {createStackNavigator} from 'react-navigation-stack';
import LoginComponent from './../components/standalone/login/login';
import SignUpComponent from './../components/standalone/register/signup';
import VehicleRegComponent from './../components/standalone/vehiclereg/vehiclereg';
import SuccessComponent from './../components/standalone/success/succes';

// import styleConfig from './../../configurations/commonStyles';

const NewUserStack = createStackNavigator(
  {
    Login: {
      screen: LoginComponent,
      navigationOptions: {headerShown: false},
    },
    Register: {
      screen: SignUpComponent,
      navigationOptions: {headerShown: false},
    },
    Vehicle: {
      screen: VehicleRegComponent,
      navigationOptions: {headerShown: false},
    },
    Success: {
      screen: SuccessComponent,
      navigationOptions: {headerShown: false},
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default NewUserStack;
