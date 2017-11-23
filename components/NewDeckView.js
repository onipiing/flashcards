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
import { width, btnWidth, inputWidth } from "../utils/helpers";
import { red } from "../utils/colors";

//TODO: test and cleanup
/*
//Get the screenwidth of the device
const { width } = Dimensions.get("window");
//Set the width for the button
const btnWidth = width - 50;
const inputWidth = width - 20;
*/

class NewDeckView extends Component {
  state = {
    text: "",
    errorMessage: ""
  };

  onInputChange = text => this.setState({ text, errorMessage: "" });

  handleSubmit = () => {
    if (this.state.text !== "") {
      const newDeck = {
        [this.state.text]: { title: this.state.text, questions: [] }
      };
      this.props.addDeck(newDeck);
      console.log(newDeck[this.state.text]);
      this.props.navigation.navigate("DeckView", {
        deck: newDeck[this.state.text]
      });
      this.setState({
        text: "",
        errorMessage: ""
      });
    } else {
      this.setState({ errorMessage: "Please fill in a title for your deck" });
    }
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
        <View>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        </View>
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
    width: btnWidth,
    marginTop: 20
  },
  btnText: {
    textAlign: "center"
  },
  input: {
    width: inputWidth,
    fontSize: 15,
    padding: 10,
    margin: 25
  },
  errorMessage: {
    color: red,
    textAlign: "center"
  }
});

export default connect(null, { addDeck })(NewDeckView);
