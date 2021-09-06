

import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class ManageEvent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          eventStack: []
        }
    
        //On se connecte à la base en premier et on récupère nos données 
        this.getCardsData();
    
      }


      getCardsData() {
        fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/events/manage/', { method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': "Bearer " + this.props.route.params.token}, body: JSON.stringify({ userId: this.props.route.params.id }) })
          .then(response => response.json())
          .then(jsonResponse => this.setState({ eventStack: jsonResponse }));
    
    
      }

    render() {

    const { navigation } = this.props;


    return (
    <View style={{ alignItems: 'center' }}>
        <Text>Vos evenements</Text>
        {
            this.state.eventStack.map(event => (
              <View style={{ width: '80%', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.26, elevation: 8, backgroundColor: 'white', margin: 8, padding: 20, borderRadius: 10 }}>
                <Text>{event.title}</Text>
                <Text>{event.details}</Text>
                <Button title="Modifier" onPress={() => { navigation.navigate("EditEvent", {event, token: this.props.route.params.token, idCreator: this.props.route.params.id, idAssos: 1}) }} ></Button>
              </View>
            ))
        }
    </View>
    );
  }
}

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <ManageEvent {...props} navigation={navigation} />;
}