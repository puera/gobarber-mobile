import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { navigationRef } from '~/services/RootNavigation';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

export default function Routes() {
  const Sign = createStackNavigator();
  const NavApp = createBottomTabNavigator();
  const signed = useSelector(state => state.auth.signed);

  function App() {
    function navIcon(iconName) {
      const icon = ({ color, size }) => (
        <Icon name={iconName} size={size} color={color} />
      );

      icon.propTypes = {
        color: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
      };
      return icon;
    }
    return (
      <NavApp.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: '#fff',
          inactiveTintColor: 'rgba(255,255,255,0.6)',
          style: {
            backgroundColor: '#8d41a8',
          },
        }}
      >
        <NavApp.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Agendamentos',
            tabBarIcon: navIcon('event'),
          }}
        />
        <NavApp.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Meu Perfil',
            tabBarIcon: navIcon('person'),
          }}
        />
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
