

import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


class AdminPanel extends React.Component {
  
  
    filter() {
        if(this.props.route.params.jsonResponse.levelAcces == 1)
        {
            return (
           <View>
                <Button title="Evenements" onPress={() => { this.props.navigation.navigate("ManageEvent")}}></Button>
                <Button title="Mes données" onPress={() => { this.props.navigation.navigate("MyData")}}></Button>
            </View> )
            
        }
        else
        {
            return(
            <View>
                <Button title="Evenements" onPress={() => { this.props.navigation.navigate("ManageEvent", {id: this.props.route.params.jsonResponse.id, token: this.props.route.params.jsonResponse.token})}}></Button>
                <Button title="Mes données" onPress={() => { this.props.navigation.navigate("MyData")}}></Button>
                <Button title="utilisateurs" onPress={() => { this.props.navigation.navigate("ManageUser")}}></Button>
                <Button title="Associations" ></Button>
            </View>) 
        }
    }
  
  
    render() {

    const { navigation } = this.props;


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Bienvenue {this.props.route.params.jsonResponse.name} | id = {this.props.route.params.jsonResponse.id}</Text>
        {
            this.filter()
        }
      </View>
    );
  }
}

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <AdminPanel {...props} navigation={navigation} />;
}