import React, { Component } from 'react';
import fetchGame from '../services/fetchGame';
import searchTokenAPI from '../services/searchTokenApi';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameQuestions: [],
      questionNumber: 0,
      token: undefined,
    };
    this.getGame = this.getGame.bind(this);
  }

  componentDidMount() {
    const { token } = this.state;
    this.getGame(token);
  }

  async getGame(token) {
    const { results, response_code: responseCode } = await fetchGame(token);
    console.log(`API response code: ${responseCode}`);
    const validTokenCode = 0;
    if (responseCode === validTokenCode) {
      this.setState({
        gameQuestions: results,
      });
    } else {
      this.getToken();
    }
  }

  async getToken() {
    const token = await searchTokenAPI();
    console.log(token);
    this.getGame(token);
  }

  randomNumber = () => {
    const range = 0.5;
    return Math.random() - range;
  }

  suffleArray = (incorrect, correct) => {
    const answers = [...incorrect, correct]
      .sort(this.randomNumber)
      .sort(this.randomNumber);
    return answers;
  }

  render() {
    const { gameQuestions, questionNumber } = this.state;
    let answers = [];
    if (gameQuestions.length > 0) {
      const {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer } = gameQuestions[questionNumber];
      answers = this.suffleArray(incorrectAnswers, correctAnswer);
    }

    return (
      <div>
        {gameQuestions.length > 0
        && (
          <div>
            <h2
              data-testid="question-category"
            >
              {gameQuestions[questionNumber].category}
            </h2>
            <h3
              data-testid="question-text"
            >
              {gameQuestions[questionNumber].question}
            </h3>
            <div data-testid="answer-options">
              {answers.map((answer, index) => (
                <button
                  key={ `answer${index}` }
                  type="button"
                  data-testid={ answer === gameQuestions[questionNumber].correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${gameQuestions[questionNumber]
                      .incorrect_answers.indexOf(answer)}` }
                >
                  {answer}
                </button>))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Game;

// "response_code":0,
//    "results":[
//       {
//          "category":"Entertainment: Video Games",
//          "type":"multiple",
//          "difficulty":"easy",
//          "question":"What is the first weapon you acquire in Half-Life?",
//          "correct_answer":"A crowbar",
//          "incorrect_answers":[
//             "A pistol",
//             "The H.E.V suit",
//             "Your fists"
//          ]
//       }
//    ]
