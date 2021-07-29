import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Appbar, Drawer, Button, Card, Title, Paragraph } from 'react-native-paper';





export default class App extends React.Component {

  constructor (props) {
    super (props)
      this.state = {
        resultats : []
      }

      const [active, setActive] = React.useState('');
    
    //On se connecte à la base en premier et on récupère nos données 
    this.getCardsData();
      
  }

  getCardsData () {
    fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/events/2')
      .then(response => response.json())
      .then(jsonResponse => this.setState({resultats : jsonResponse}));
      
      

    }


  render () {

  

    return (

      
      
      <View>

            <View>
              <Appbar.Header>
                <Appbar.Content title="Mairkur" subtitle={'App futuriste'} />
              </Appbar.Header>
            </View>

            <Drawer.Section title="Some title">
              <Drawer.Item
                label="First Item"
                active={active === 'first'}
                onPress={() => setActive('first')}
              />
              <Drawer.Item
                label="Second Item"
                active={active === 'second'}
                onPress={() => setActive('second')}
              />
            </Drawer.Section>

            <View style={styles.container}>

          
              
              
              <Text>Events</Text>
                {
                  this.state.resultats.map(event => (   
                    
                    <div style={{borderWidth: 50}}>
                      <h1>{event.title}</h1>
                      <h3>{event.details}</h3>
                    </div>
                   
                  ))
                }
             
            </View>
            {console.log(this.state.resultats[0])}

      </View>

      
        
      
    );
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
