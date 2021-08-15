

import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class DetailsEvent extends React.Component {
  render() {

    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>URL de l'image :{this.props.route.params.event.ImageURL}</Text>
        <Text>{this.props.route.params.event.title}</Text>
        <Text>{this.props.route.params.event.details}</Text>
        <Text>Début le :{this.props.route.params.event.dayStartEvent}</Text>
        <Text>Fin le :{this.props.route.params.event.dayEndEvent}</Text>
        <Text>Posté le :{this.props.route.params.event.dayCreation}</Text>
      </View>
    );
  }
}

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <DetailsEvent {...props} navigation={navigation} />;
}