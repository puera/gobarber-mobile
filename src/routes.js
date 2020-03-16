import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { navigationRef } from '~/services/RootNavigation';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';

export default function Routes() {
  const Sign = createStackNavigator();
  const NavApp = createBottomTabNavigator();
  const signed = useSelector(state => state.auth.signed);

  function App() {
    return (
      <NavApp.Navigator>
        <NavApp.Screen name="Dashboard" component={Dashboard} />
      </NavApp.Navigator>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Sign.Navigator
        initialRouteName={signed ? 'App' : 'SignIn'}
        headerMode="none"
      >
        <Sign.Screen name="SignIn" component={SignIn} />
        <Sign.Screen name="SignUp" component={SignUp} />
        <Sign.Screen name="App" component={App} />
      </Sign.Navigator>
    </NavigationContainer>
  );
}
