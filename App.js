import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default class App extends React.Component {

  constructor (props) {
    super (props)
      this.state = {
        resultats : 'rien'
      }
  }

  
  render () {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.test()} title="acné" color="blue" />
        <Text>ce que je vois c'est :</Text>
        <StatusBar style="auto" />
        <Text>{this.state.resultats}</Text>
      </View>
    );
  }
  
  test () {
    fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/events')
      .then(response => response.json())
      .then(jsonResponse =>
        this.setState({resultats : JSON.stringify(jsonResponse)
      }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
