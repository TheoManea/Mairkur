// screens/login.js

import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { json } from 'body-parser';

class Login extends React.Component {

  // DANS LE CADRE DE TESTS -> A RETIRER AU PLUS VITE DES QUE C'EST FINI
  constructor(props) {
    super(props)
    this.state = {
      emailInp: "theomanea9@gmail.com",
      passInp: "motdepasse"
    }
  }

  onSubmit() {
    const email = this.state.emailInp;
    const pass = this.state.passInp;
     // http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/auth/login
    fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/auth/login', { method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify({ email: email, password: pass }) })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.hasOwnProperty('error')) {
          alert("Erreur de connexion");
        } else {
          //alert("Nice pd");
          // on ajoute l'email à l'objet jsonResponse
          jsonResponse.email = email
          this.props.navigation.navigate("AdminPanel", {jsonResponse});
        }
      }
      );
  }

  render() {

    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Connection</Text>

        <Text>Email</Text>
        <TextInput onChangeText={(txt) => this.setState({ emailInp: txt })} value={this.state.emailInp} autoCompleteType="email" style={{ backgroundColor: '#ff5500' }} />
        <Text>Mot de passe</Text>
        <TextInput onChangeText={(txt) => this.setState({ passInp: txt })} value={this.state.passInp} autoCompleteType="password" style={{ backgroundColor: '#ff5500' }} />

        <Button title="Se Connecter" onPress={() => this.onSubmit()} style={{ width: '30%' }} ></Button>
      </View>
    );
  }
}


// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <Login {...props} navigation={navigation} />;
}