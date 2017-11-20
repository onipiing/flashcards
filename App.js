// @flow
import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { setLocalNotification } from "./utils/helpers";
import { teal, white } from "./utils/colors";
import { Constants } from "expo";
import DeckListView from "./components/DeckListView";
import NewDeckView from "./components/NewDeckView";
import DeckView from "./components/DeckView";
import QuizView from "./components/QuizView";
import NewQuestionView from "./components/NewQuestionView";
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

function MobileflashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator(
  {
    DeckListView: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: "Decks"
      }
    },
    NewDeckView: {
      screen: NewDeckView,
      navigationOptions: {
        tabBarLabel: "Add Deck"
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? teal : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : teal,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deck.title}`,
      headerTitleStyle: {
        alignSelf: "center"
      },
      headerRight: <View />,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal
      }
    })
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: "Quiz",
      headerTitleStyle: {
        alignSelf: "center"
      },
      headerRight: <View />,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal
      }
    }
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions: {
      title: "Add card",
      headerTitleStyle: {
        alignSelf: "center"
      },
      headerRight: <View />,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal
      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MobileflashcardStatusBar
            backgroundColor={teal}
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
