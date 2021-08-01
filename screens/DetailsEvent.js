

import  React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class DetailsEvent extends React.Component  {
  render() {

    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Event</Text>
      </View>
    );
  }
}

// Wrap and export
export default function(props) {
    const navigation = useNavigation();
  
    return <DetailsEvent {...props} navigation={navigation} />;
  }