import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import DetailsEvent from './screens/DetailsEvent';
import AdminPanel from './screens/AdminPanel';
import ManageEvent from './screens/ManageEvent';
import MyData from './screens/MyData';
import ManageUser from './screens/ManageUser';
import EditEvent from './screens/EditEvent';

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
        <Stack.Screen name="MyData" component={MyData} />
        <Stack.Screen name="ManageUser" component={ManageUser} />
        <Stack.Screen name="EditEvent" component={EditEvent} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default MyStack