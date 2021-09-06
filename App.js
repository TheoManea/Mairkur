import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import DetailsEvent from './screens/DetailsEvent';
import AdminPanel from './screens/AdminPanel';
import ManageEvent from './screens/ManageEvent';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Mairkur" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DetailsEvent" component={DetailsEvent} />
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
        <Stack.Screen name="ManageEvent" component={ManageEvent} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default MyStack