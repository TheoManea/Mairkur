// screens/login.js

import  React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class Login extends React.Component  {
  render() {

    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Connection</Text>
      </View>
    );
  }
}

// Wrap and export
export default function(props) {
    const navigation = useNavigation();
  
    return <Login {...props} navigation={navigation} />;
  }