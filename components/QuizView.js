import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { teal, white, gray, red } from "../utils/colors";

//TODO: Distract width and btnWidth to separate file
//TODO: Add form validation for inputfields!

//Get the width of the screen
const { width } = Dimensions.get("window");
//Set the width of button

const btnWidth = width - 50;

class QuizView extends Component {
  state = {
    selectedQuestion: 0,
    showAnswer: false,
    correctAnswers: 0
  };

  //Handles changing from question to answer or vica versa.
  handleClick = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  };

  //Keeps tracks of the number of correct answer given
  correctAnswers = () => {
    this.setState({ correctAnswers: this.state.correctAnswers + 1 });
    this.nextQuestion();
  };

  //Keeps tracks of which question should be displayed next
  nextQuestion = () => {
    this.setState({ selectedQuestion: this.state.selectedQuestion + 1 });
  };

  //Clears the values for the number of correct answers and the question that
  //should be displayed, so the quiz can be taken again.
  reset = () => {
    this.setState({
      selectedQuestion: 0,
      correctAnswers: 0
    });
  };

  render() {
    const { deck } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        {/*Display the number of questions answered, and the total number of questions,
      to notify user of progress*/}
        {this.state.selectedQuestion + 1 <= deck.questions.length && (
          <View style={styles.questionCount}>
            <Text>
              {this.state.selectedQuestion + 1}/{deck.questions.length}
            </Text>
          </View>
        )}

        <View style={styles.container}>
          {/*Check if the deck has cards/questions. If not, display a message for the user, to add a question/card*/}
          {deck.questions.length === 0 && (
            <View>
              <View style={styles.shadow}>
                <Text style={styles.title}>
                  Your deck has no questions yet. Please add a question/card to
                  your deck, so you can start the quiz.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("DeckView", {
                    deck
                  })}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Go Back</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {/*If the number of questions in a deck is smaller or even to the
        number of the selectedQuestion, the quiz is done, and the user will
        get feedback on the number of questions he/she answerd correct*/}
          {deck.questions.length > 0 &&
          deck.questions.length <= this.state.selectedQuestion ? (
            <View>
              <Text style={styles.correct}>
                {/*Give the user feedback on the number of questions answered correctly*/}
                {`You answered ${this.state.correctAnswers} out of ${deck
                  .questions.length} questions correctly`}.
              </Text>
              {/*Calculate the score to give the user feedback on how well he/she did
              and round the score to a whole (percentage) number*/}
              <Text style={styles.title}>
                {`Your Score: ${(this.state.correctAnswers /
                  deck.questions.length *
                  100
                ).toFixed(0)}%`}
              </Text>
              {/*Display message for user based on the score they got*/}
              {this.state.correctAnswers / deck.questions.length < 0.6 && (
                <View>
                  <Text style={styles.message}>
                    You need some more practice!
                  </Text>
                  <Entypo
                    style={styles.icon}
                    name="emoji-sad"
                    size={50}
                    color={red}
                  />
                </View>
              )}
              {this.state.correctAnswers / deck.questions.length > 0.8 &&
                this.state.correctAnswers / deck.questions.length < 1 && (
                  <View>
                    <Text style={styles.message}>Well done!</Text>
                    <Entypo
                      style={styles.icon}
                      name="emoji-happy"
                      size={50}
                      color={teal}
                    />
                  </View>
                )}

              {this.state.correctAnswers / deck.questions.length === 1 && (
                <View>
                  <Text style={styles.message}>
                    Well done, you master all the material!
                  </Text>
                  <Entypo
                    style={styles.icon}
                    name="emoji-happy"
                    size={50}
                    color={teal}
                  />
                </View>
              )}

              <TouchableOpacity onPress={() => this.reset()}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Restart Quiz</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("DeckView", {
                    deck
                  })}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Back</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            //Check to see if the question is the selected question, if so, display the question.
            deck.questions
              .filter((question, i) => i === this.state.selectedQuestion)
              .map(question => (
                <View key={question.question}>
                  {/*Check if we need to display the question or the answer*/}
                  {!this.state.showAnswer ? (
                    <View style={styles.shadow}>
                      <Text style={styles.title}>{question.question}</Text>
                      <TouchableOpacity onPress={() => this.handleClick()}>
                        <View>
                          <Text style={styles.text}>Answer</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.shadow}>
                      <Text style={styles.title}>{question.answer}</Text>
                      <TouchableOpacity onPress={() => this.handleClick()}>
                        <View>
                          <Text style={styles.text}>Question</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  {/*If user presses correct, count + 1 on the correctAnswers, and go to the next question*/}
                  <TouchableOpacity onPress={() => this.correctAnswers()}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Correct</Text>
                    </View>
                  </TouchableOpacity>
                  {/*If user presses incorrect go to the next question*/}
                  <TouchableOpacity onPress={() => this.nextQuestion()}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Incorrect</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: "center",
    padding: 10
  },
  questionCount: {
    flex: -1,
    justifyContent: "flex-start",
    alignSelf: "flex-start"
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    padding: 10
  },
  correct: {
    fontSize: 18,
    textAlign: "center"
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 5,
    color: teal
  },
  btn: {
    width: btnWidth,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 16,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: teal
  },
  btnText: {
    fontSize: 16,
    textAlign: "center"
  },
  shadow: {
    borderColor: "rgba(0, 128, 128, 0.5)",
    borderWidth: 1,
    elevation: 2,
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 2
  },
  message: {
    textAlign: "center",
    fontSize: 18
  },
  icon: {
    textAlign: "center",
    fontSize: 50,
    marginTop: 10
  }
});

export default QuizView;
