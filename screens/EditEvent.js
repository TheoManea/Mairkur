

import React from 'react';
import { StyleSheet, Text, View, Alert, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

class EditEvent extends React.Component {

    
    constructor(props) {
        super(props)
        this.state = {
          title:this.props.route.params.event.title,
          des:this.props.route.params.event.details
        }

        

    }

    onSubmit() {

        fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/events/edit', { method: 'PUT', headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.props.route.params.token}, body: JSON.stringify({userId: this.props.route.params.idCreator, title: this.state.title, details: this.state.des, id: this.props.route.params.event.id, dayStartEvent: this.props.route.params.event.dayStartEvent, dayEndEvent: this.props.route.params.event.dayEndEvent}) })
            .then(response => response.json())
            .then(jsonResponse =>
                {
                console.log("Well what ?")
                console.log(JSON.stringify(jsonResponse))
                alert("id creator : " + this.props.route.params.idCreator + "\n title :" + this.state.title + "\n des : " + this.state.des + " id : " + this.props.route.params.event.id + " \n start " + this.props.route.params.event.dayStartEvent + "\n " + this.props.route.params.event.dayEndEvent) 
                }
            );

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
        onChangeText={(txt) => this.setState({ title: txt })}
        value={this.state.title}
        />
        <TextInput
            multiline={true}
            numberOfLines={25}
            style={styles.input}
            onChangeText={(txt) => this.setState({ des: txt })}
            value={this.state.des}
        />
        <Button title="Update" onPress={() => this.onSubmit()} ></Button>
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