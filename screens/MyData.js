import React from 'react';
import { StyleSheet, Text, View, Alert, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class MyData extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nameOld: this.props.route.params.personalInfo.name,
      fNameOld: this.props.route.params.personalInfo.familyName,
      passOld: "",
      emailOld: this.props.route.params.personalInfo.email,

      nameNew: this.props.route.params.personalInfo.name,
      fNameNew: this.props.route.params.personalInfo.familyName,
      passNew: "",
      confPassNew: "",
      emailNew: this.props.route.params.personalInfo.email
    }
  }

  // to complete ...
  save() {
    //return
    // save data
    // check if the password have been changed (if yes : change it, otherwise, do not touch at the field in the db)

    let bodyField = {
      userId: this.props.route.params.personalInfo.id,
      name: this.state.nameNew,
      familyName: this.state.fNameNew,
      email: this.state.emailNew
    }

    //check if every field isn't empty
    for (var key in bodyFIeld) {
      if (bodyField.hasOwnProperty(key) && p[key] === "") {
        // one field is empty
        return
      }
    }

    if (this.state.passNew !== "") {
      if (this.state.confPassNew === this.state.passNew) {
        bodyField.password = this.state.passNew
      } else {
        // not the same pass and confPass
        return
      }
    }

    fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/auth/ownedit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.props.route.params.personalInfo.token
      },
      body: JSON.stringify(bodyField)
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.hasOwnProperty('error')) {
          alert("Erreur de connexion");
        } else {
          //alert("Nice pd");
          // on ajoute l'email à l'objet jsonResponse
          jsonResponse.email = email
          this.props.navigation.navigate("AdminPanel", { jsonResponse });
        }
      }
      );
  }

  render() {

    const { navigation } = this.props;

    const clickableStyle = {
      color: "#0066CC",
      textDecorationLine: 'underline'
    }


    // confirm field if pass field isn't empty
    let confPass
    if (this.state.passNew !== "") {
      confPass = (
        <div>
          <div>Confirmer votre mot de passe :</div>
          <TextInput onChangeText={(txt) => this.setState({ confPassNew: txt })} value={this.state.confPassNew} style={{ backgroundColor: '#ff5500' }} />
        </div>
      )
    }


    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Mes données</Text>

        <Popup trigger={ // le text afficher de base de doit pas s'actualiser tout de suite, il faut que le back confirm
          <View>
            <div>
              <Text>Nom :</Text>
              <Text style={clickableStyle}>{this.state.nameOld}</Text>
            </div>

            <div>
              <Text>Nom de famille :</Text>
              <Text style={clickableStyle}>{this.state.fNameOld}</Text>
            </div>

            <div>
              <Text>mot de passe:</Text>
              <Text style={clickableStyle}>{this.state.passOld}</Text>
            </div>

            <div>
              <Text>email :</Text>
              <Text style={clickableStyle}>{this.state.emailOld}</Text>
            </div>
          </View>
        } modal>
          {close => (
            <div>
              <div>Changer votre nom :</div>
              <TextInput onChangeText={(txt) => this.setState({ nameNew: txt })} value={this.state.nameNew} style={{ backgroundColor: '#ff5500' }} />

              <div>Changer votre nom de famille:</div>
              <TextInput onChangeText={(txt) => this.setState({ fNameNew: txt })} value={this.state.fNameNew} style={{ backgroundColor: '#ff5500' }} />

              <div>Changer votre mot de passe :</div>
              <TextInput onChangeText={(txt) => this.setState({ passNew: txt })} value={this.state.passNew} style={{ backgroundColor: '#ff5500' }} />

              {confPass}

              <div>Changer votre email :</div>
              <TextInput onChangeText={(txt) => this.setState({ emailNew: txt })} value={this.state.emailNew} style={{ backgroundColor: '#ff5500' }} />

              <Button title='Enregistrer' onPress={() => {
                this.save()
                close()
              }} />
              <Button title='Annuler' onPress={close} />
            </div>
          )}

        </Popup>
      </View>
    );
  }
}

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <MyData {...props} navigation={navigation} />;
}