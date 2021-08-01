import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
//import { Appbar, Drawer, Button, Card, Title, Paragraph } from 'react-native-paper';





class Home extends React.Component {

  constructor (props) {
    super (props)
      this.state = {
        resultats : []
      }

    
    //On se connecte à la base en premier et on récupère nos données 
    this.getCardsData();
      
  }

  getCardsData () {
    fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/events/2')
      .then(response => response.json())
      .then(jsonResponse => this.setState({resultats : jsonResponse}));
      
      

    }


  render () {

    const { navigation } = this.props;

    const Drawer = createDrawerNavigator();

    return (
      <View>
        

          <Button onPress = {() => {navigation.navigate("Login")}} title="Se connecter"></Button>

            <View style={{alignItems: 'center'}}>
                {
                  this.state.resultats.map(event => (   
                    
                    <View style={{width: '80%',shadowColor: 'black',shadowOffset: { width: 0, height: 2 },shadowRadius: 6,shadowOpacity: 0.26,elevation: 8,backgroundColor: 'white',margin: 8,padding: 20,borderRadius: 10}}>
                        
                      <Text>{event.title}</Text>
                      <Text>{event.details}</Text>
                      <Button title="Plus d'information" style={{width: '30%'}}></Button>
                    </View>
                    
                   
                  ))
                }
             
            </View>
            {console.log(this.state.resultats[0])}

      </View>

      
        
      
    );
  }
  
  


  

}

// Wrap and export
export default function(props) {
    const navigation = useNavigation();
  
    return <Home {...props} navigation={navigation} />;
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
