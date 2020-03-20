import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from '~/services/RootNavigation';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/routes/Dashboard';

export default function Routes() {
  const Sign = createStackNavigator();
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer ref={navigationRef}>
      <Sign.Navigator
        initialRouteName={signed ? 'App' : 'SignIn'}
        headerMode="none"
      >
        <Sign.Screen name="SignIn" component={SignIn} />
        <Sign.Screen name="SignUp" component={SignUp} />
        <Sign.Screen name="App" component={Dashboard} />
      </Sign.Navigator>
    </NavigationContainer>
  );
}
