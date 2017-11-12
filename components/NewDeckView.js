import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";

//Get the screenwidth of the device
const { width } = Dimensions.get("window");
//Set the width for the button
const btnWidth = width - 50;
const inputWidth = width - 20;

class NewDeckView extends Component {
  state = {
    text: ""
  };

  onInputChange = text => this.setState({ text });

  handleSubmit = () => {
    const newDeck = {
      [this.state.text]: { title: this.state.text, questions: [] }
    };
    this.props.addDeck(newDeck);
    console.log(newDeck[this.state.text]);
    this.props.navigation.navigate("DeckView", {
      deck: newDeck[this.state.text]
    });
    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.text}
          placeholder="Deck Title"
          onChangeText={this.onInputChange}
        />
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Add Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  btn: {
    padding: 10,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "teal",
    width: btnWidth
  },
  btnText: {
    textAlign: "center"
  },
  input: {
    width: inputWidth,
    fontSize: 15,
    padding: 10,
    margin: 25
  }
});

export default connect(null, { addDeck })(NewDeckView);
