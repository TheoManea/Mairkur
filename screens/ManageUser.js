
import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class ManageUser extends React.Component {

    render() {

    const { navigation } = this.props;

    return (
    <View style={{ alignItems: 'center' }}>
        <Text>Gerer les utilisateurs</Text>
        
    </View>
    );
  }
}

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <ManageUser {...props} navigation={navigation} />;
}