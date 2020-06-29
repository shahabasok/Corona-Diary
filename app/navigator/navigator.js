/**
 * @fileoverview Main navigator component
 * @author Mohammed Shahabas
 */
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import Splash from './../components/standalone/splash/spalsh';
import NewUserStack from './newUserStack';
import {ExistingUserStack} from './existingUser';

export const AppStack = createAppContainer(
  createSwitchNavigator(
    {
      SplashScreen: Splash,
      UserStack: NewUserStack,
      ExistingUser: ExistingUserStack,
    },
    {
      initialRouteName: 'SplashScreen',
    },
  ),
);
