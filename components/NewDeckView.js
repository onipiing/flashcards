import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";

//Get the screenwidth of the device
const { width } = Dimensions.get("window");
//Set the width for the button
const btnWidth = width - 40;

class NewDeckView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn}>
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
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "gray",
    width: btnWidth
  },
  btnText: {
    textAlign: "center"
  }
});

export default NewDeckView;
