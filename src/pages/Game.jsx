import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import fetchGame from '../services/fetchGame';
import searchTokenAPI from '../services/searchTokenApi';
import { addToken, updateScore } from '../actions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameQuestions: [], // informações relacionadas a cada uma das perguntas
      questionNumber: 0, // número da questão sendo apresentada
      currentTime: 30,
    };
    this.getGame = this.getGame.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;
    console.log(token);
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
    const { saveNewToken } = this.props;
    const token = await searchTokenAPI();
    saveNewToken(token);
    this.getGame(token);
  }

  randomNumber = () => {
    const range = 0.5;
    return Math.random() - range;
  }

  checkAnswer = (userAnswer) => {
    const { gameQuestions, questionNumber, currentTime } = this.state;
    const { correct_answer: correctAnswer } = gameQuestions[questionNumber];
    const { updateScoreDispatch } = this.props;
    const scoreDefault = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    if (userAnswer === correctAnswer) {
      if (gameQuestions[questionNumber].difficulty === 'easy' && currentTime > 0) {
        const scoreEasy = scoreDefault + (currentTime * easy);
        updateScoreDispatch(scoreEasy);
      }
      if (gameQuestions[questionNumber].difficulty === 'medium' && currentTime > 0) {
        const scoreMedium = scoreDefault + (currentTime * medium);
        updateScoreDispatch(scoreMedium);
      }
      if (gameQuestions[questionNumber].difficulty === 'hard' && currentTime > 0) {
        const scoreHard = scoreDefault + (currentTime * hard);
        updateScoreDispatch(scoreHard);
      }
      console.log('acertou mizeravi');
    } else {
      console.log('errou rude, errou feio');
    }
    if (questionNumber === (gameQuestions.length - 1)) {
      console.log('termina jogo');
    } else {
      this.setState({
        questionNumber: questionNumber + 1,
      });
    }
  }

  // nextQuestion = (increase)

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
        <Header />
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
                  onClick={ () => this.checkAnswer(answer) }
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

const mapStateToProps = (state) => ({
  token: state.token,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveNewToken: (token) => dispatch(addToken(token)),
  updateScoreDispatch: (payload) => dispatch(updateScore(payload)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  saveNewToken: PropTypes.func.isRequired,
  updateScoreDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
