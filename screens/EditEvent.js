

import React from 'react';
import { StyleSheet, Text, View, Alert, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class EditEvent extends React.Component {

    
    constructor(props) {
        super(props)
        this.state = {
          title:"",
          des:""
        }

    }

    render() {

    const { navigation } = this.props;

    return (
    <View style={{ alignItems: 'center' }}>
        <Text>Modifier l'évenement</Text>
        <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.input}
        value={this.props.route.params.event.title}
        />
        <TextInput
            multiline={true}
            numberOfLines={25}
            style={styles.input}
            value={this.props.route.params.event.details}
        />
        <Button title="Update"></Button>
    </View>
    );
  }
}

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <EditEvent {...props} navigation={navigation} />;
}


const styles = StyleSheet.create({
    input: {
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });