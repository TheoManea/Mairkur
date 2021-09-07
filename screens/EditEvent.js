

import React from 'react';
import { StyleSheet, Text, View, Alert, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment-timezone';


class EditEvent extends React.Component {


  constructor(props) {
    super(props)
    // default : create event
    // mode: 0(create), 1(edit)
    this.state = {
      mode: 0,
      title: "",
      des: "",
      assosStack: [],
      assosSelected: 0
    }

    // edit event
    if (this.props.route.params.hasOwnProperty("event")) {
      this.state = {
        mode: 1,
        title: this.props.route.params.event.title,
        des: this.props.route.params.event.details,
        assosStack: [],
        assosSelected: this.props.route.params.event.idAssos
      }
    }

    this.getAssos();

    // date time from UTC to local (Paris)
    // alert(moment.utc('2020-01-03T12:52:00.000Z').tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss'));

    // date time from local (Paris) to UTC
    // alert(moment.tz('2020-01-03T12:52:00.000Z', 'YYYY-MM-DD HH:mm:ss', 'Europe/Paris').utc().format('YYYY-MM-DD HH:mm:ss'));

  }

  getAssos() {
    fetch('http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/assos/home', { method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({ assosStack: jsonResponse })
      }
      );
  }

  onSubmit() {
    var URL = 'http://mairkurapi.eu-west-3.elasticbeanstalk.com/api/events/';
    var meth = "";
    if (this.state.mode === 1) {
      URL += "edit";
      meth = "PUT";
    } else if (this.state.mode === 0) {
      URL += "create";
      meth = "POST";
    }
    fetch(URL,
      {
        method: meth,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.props.route.params.token },
        body: JSON.stringify(
          {
            userId: this.props.route.params.idCreator,
            title: this.state.title,
            details: this.state.des,
            id: this.props.route.params.event.id,
            dayStartEvent: moment(this.props.route.params.event.dayStartEvent).format('YYYY-MM-DD HH:mm:ss'),
            dayEndEvent: moment(this.props.route.params.event.dayEndEvent).format('YYYY-MM-DD HH:mm:ss'),
            idAssos: this.state.assosSelected
          })
      })
      .then(response => response.json())
      .then(jsonResponse => {
        // console.log("Well what ?")
        // console.log(JSON.stringify(jsonResponse))
        // alert("id creator : " + this.props.route.params.idCreator + "\n title :" + this.state.title + "\n des : " + this.state.des + " id : " + this.props.route.params.event.id + " \n start " + this.props.route.params.event.dayStartEvent + "\n " + this.props.route.params.event.dayEndEvent)
        alert("événement modifié !")
      }
      );
  }

  render() {

    const { navigation } = this.props;

    // https://callstack.github.io/react-native-paper/fab-group.html
    // https://callstack.github.io/react-native-paper/modal.html
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

        <Picker
          selectedValue={this.state.assosSelected}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ assosSelected: itemValue })
          }}
        >
          {
            this.state.assosStack.map(assos => (
              <Picker.Item label={assos.title} value={assos.id} />
            ))
          }
        </Picker>
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