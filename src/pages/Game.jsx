import React, { Component } from 'react';
import fetchGame from '../services/fetchGame';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameQuestions: [],
      questionNumber: 0,
    };
    this.getGame = this.getGame.bind(this);
  }

  componentDidMount() {
    this.getGame();
  }

  async getGame() {
    const { results } = await fetchGame();
    // console.log(dataGame);
    this.setState({
      gameQuestions: results,
    });
    return results;
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

  // https://flaviocopes.com/how-to-shuffle-array-javascript/
  // list = list.sort(() => Math.random() - 0.5)

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
            <div>
              {answers.map((answer, index) => (
                <button
                  key={ `answer${index}` }
                  type="button"
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
