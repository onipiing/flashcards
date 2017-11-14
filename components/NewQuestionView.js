// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { teal, white, gray } from "../utils/colors";
import { addCard } from "../actions";

//Get the screenwidth of the device
const { width } = Dimensions.get("window");
//Set the width for the button
const btnWidth = width - 50;
const inputWidth = width - 20;

class NewQuestionView extends Component {
  state = {
    question: "",
    answer: ""
  };

  onInputQuestion = question => this.setState({ question });

  onInputAnswer = answer => this.setState({ answer });

  handleSubmit = () => {
    //TODO: Only submit when formfields contain data.
    const { deck } = this.props.navigation.state.params;
    const updatedDeck = {
      [deck.title]: {
        title: deck.title,
        questions: [
          {
            question: this.state.question,
            answer: this.state.answer
          },
          ...deck.questions
        ]
      }
    };
    console.log(updatedDeck);
    this.props.addCard(updatedDeck);
    this.props.navigation.navigate("DeckView", {
      deck
    });
  };

  render() {
    //TODO: Add form validation
    console.log(this.state);
    console.log(this.props);
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.onInputQuestion}
          style={styles.input}
          placeholder="Add Question"
        />
        <TextInput
          onChangeText={this.onInputAnswer}
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

export default connect(null, { addCard })(NewQuestionView);
