import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native';
import { QuizData } from './data/QuizQuestions.js';
import { Question } from '../sections/Questions.js';

export class Quiz extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      questLoaded = false,
      totalScore: 100,
      completedQuiz: false
    };
  }

  componentDidMount(){
    let numQuestions = Array.from(QuizData.questions).length
    this.setState({
      questList: Array.from(QuizData.questions),
      questLoaded: true,
      numberOfQuestions: numQuestions,
      incorrect: 0,
      questionAnswered: 0
    });
  }

  updateScore =(penalty)=> {
    let tempScore = this.state.totalScore;
    let missed = this.state.incorrect;
    let questionsTotal = this.state.numberOfQuestions;
    let questionsDone = this.state.questionAnswered;

    let newScore = tempScore - penalty;
    let totalAnswered = questionsDone + 1;
    let totalMissed = penalty ? missed + 1 : missed;

    this.setState({
      totalScore: newScore,
      incorrect: totalMissed,
      questionAnswered: totalAnswered
    })
    if (totalAnswered === questionText) {
      this.setState({
        completedQuiz: true
      })
    }
  }
}
