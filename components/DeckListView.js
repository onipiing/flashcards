// @flow

import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { fetchDecks } from "../actions";
import { teal, white, gray } from "../utils/colors";

import { setDummyData } from "../utils/_InitialData";

class DeckListView extends React.Component {
  componentDidMount() {
    this.props.fetchDecks();
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.cardCount}>{`${item.questions.length} cards`}</Text>
      </View>
    );
  };

  render() {
    const decks = Object.values(this.props.decks);

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.title}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  decks: state
});

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
  }
});

export default connect(mapStateToProps, { fetchDecks })(DeckListView);
