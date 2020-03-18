import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Appointments from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import newAppointment from '~/routes/NewAppointment';

export default function Dashboard() {
  const NavBottom = createBottomTabNavigator();
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
    <NavBottom.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255,255,255,0.6)',
        style: {
          backgroundColor: '#8d41a8',
        },
      }}
    >
      <NavBottom.Screen
        name="Dashboard"
        component={Appointments}
        options={{
          tabBarLabel: 'Agendamentos',
          tabBarIcon: navIcon('event'),
        }}
      />
      <NavBottom.Screen
        name="newAppointment"
        component={newAppointment}
        options={{
          tabBarLabel: 'Agendar',
          tabBarIcon: navIcon('add-circle-outline'),
          tabBarVisible: false,
        }}
      />

      <NavBottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: navIcon('person'),
        }}
      />
    </NavBottom.Navigator>
  );
}
