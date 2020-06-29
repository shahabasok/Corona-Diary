/**
 * @fileoverview Stack for already existing user.
 * @author Mohammed Shahabas
 */

import {createStackNavigator} from 'react-navigation-stack';
import LoginComponent from './../components/standalone/login/login';
import SignUpComponent from './../components/standalone/register/signup';

// import styleConfig from './../../configurations/commonStyles';

const NewUserStack = createStackNavigator(
  {
    Login: {
      screen: LoginComponent,
      navigationOptions: {headerShown: false},
    },
    Register: {
      screen: SignUpComponent,
      navigationOptions: {title: 'Set up Profile'},
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default NewUserStack;
