// @flow
import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { teal, white, gray } from "../utils/colors";

//Get the screenwidth of the device
const { width } = Dimensions.get("window");
//Set the width for the button
const btnWidth = width - 50;

class DeckView extends Component {
  render() {
    console.log(this.props);
    const { deck } = this.props.navigation.state.params;
    if (!deck) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardCount}>{`${deck.questions
            .length} cards`}</Text>

          {/*TODO: Add components, and render them onPress*/}
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  title: {
    fontSize: 18,
    textAlign: "center"
  },
  cardCount: {
    color: gray,
    textAlign: "center",
    marginBottom: 15
  },
  btn: {
    padding: 10,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "teal",
    width: btnWidth,
    marginBottom: 8
  },
  btnText: {
    textAlign: "center"
  }
});

export default DeckView;
