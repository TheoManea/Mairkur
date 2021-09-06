

import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class MyData extends React.Component {

    render() {

    const { navigation } = this.props;

    return (
    <View style={{ alignItems: 'center' }}>
        <Text>Mes données</Text>
        
    </View>
    );
  }
}

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <MyData {...props} navigation={navigation} />;
}