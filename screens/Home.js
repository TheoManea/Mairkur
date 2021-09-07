import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
//import { Appbar, Drawer, Button, Card, Title, Paragraph } from 'react-native-paper';



class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      eventStack: [],
      assoStack: []
    }

    //On se connecte à la base en premier et on récupère nos données 
    this.getCardsData();

  }

  getCardsData() {
    fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/events/home')
      .then(response => response.json())
      .then(jsonResponse => this.setState({ eventStack: jsonResponse }));

    fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/assos')
      .then(response => response.json())
      .then(jsonResponse => this.setState({ assoStack: jsonResponse }));
  }

  render() {
    const { navigation } = this.props;
    const Drawer = createDrawerNavigator();

    return (
      <View>
        <Button onPress={() => { navigation.navigate("Login") }} title="Se connecter"></Button>
        <View style={{ alignItems: 'center' }}>
          {
            this.state.eventStack.map(event => (
              <View style={{ width: '80%', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.26, elevation: 8, backgroundColor: 'white', margin: 8, padding: 20, borderRadius: 10 }}>
                <Text>{event.title}</Text>
                <Text>{event.details}</Text>
                <Button title="Plus d'information" onPress={() => { navigation.navigate("DetailsEvent", { event }) }} style={{ width: '30%' }}></Button>
              </View>
            ))
          }
        </View>

        <Text style={{ fontSize: 20, alignItems: 'center' }}>Liste des clubs</Text>

        <View style={{ alignItems: 'center' }}>
          {
            this.state.assoStack.map(assos => (
              <View style={{ width: '80%', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.26, elevation: 8, backgroundColor: 'white', margin: 8, padding: 20, borderRadius: 10 }}>
                <Text>{assos.title}</Text>
                <Text>{assos.details}</Text>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}


// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <Home {...props} navigation={navigation} />;
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
