// @flow
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { teal, white, gray } from "../utils/colors";

//Get the screenwidth of the device
const { width } = Dimensions.get("window");
//Set the width for the button
const btnWidth = width - 50;
const inputWidth = width - 20;

class NewQuestionView extends Component {
  state = {
    text: ""
  };

  onInputChange = text => this.setState({ text });

  handleSubmit = () => {};

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.onInputChange}
          style={styles.input}
          placeholder="Add Question"
        />
        <TextInput
          onChangeText={this.onInputChange}
          style={styles.input}
          placeholder="Add answer"
        />
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Submit</Text>
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

export default NewQuestionView;
