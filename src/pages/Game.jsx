import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { decode } from 'he';
import fetchGame from '../services/fetchGame';
import searchTokenAPI from '../services/searchTokenApi';
import { addToken, updateScore, updateCorrectAnswers } from '../actions';
import Header from '../components/Header';
import Timer from '../components/Timer';
import '../css/game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameQuestions: [], // informações relacionadas a cada uma das perguntas
      questionNumber: 0, // número da questão sendo apresentada
      overTime: false,
      timerOn: true,
      questionAnswered: false,
      currentTime: 30,
      nextButton: false, // define se o botão next ficará visível para na tela
      redirectToFeedback: false,
      arrayOfAnswers: [],
    };
    this.getGame = this.getGame.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;
    this.getGame(token);
  }

  async getGame(token) {
    const { results, response_code: responseCode } = await fetchGame(token);
    console.log(results);
    const validTokenCode = 0;
    if (responseCode === validTokenCode) {
      const arrayOfAnswers = [];
      console.log(this.randomNumber);
      results.forEach((element, index) => {
        const answers = [element.correct_answer, ...element.incorrect_answers];
        arrayOfAnswers[index] = answers.sort(this.randomNumber);
      });
      console.log(arrayOfAnswers);
      this.setState({ gameQuestions: results, arrayOfAnswers });
    } else { this.getToken(); }
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

  getTime = (time) => {
    this.setState({ currentTime: time });
  }

  calculateAndUpdateScore = () => {
    const { gameQuestions, questionNumber, currentTime } = this.state;
    const { updateScoreDispatch } = this.props;
    const scoreDefault = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    let score = 0;
    if (gameQuestions[questionNumber].difficulty === 'easy' && currentTime > 0) {
      score = scoreDefault + (currentTime * easy);
    } else if (gameQuestions[questionNumber].difficulty === 'medium' && currentTime > 0) {
      score = scoreDefault + (currentTime * medium);
    } else if (gameQuestions[questionNumber].difficulty === 'hard' && currentTime > 0) {
      score = scoreDefault + (currentTime * hard);
    }
    updateScoreDispatch(score);
  }

  handleEndOfAnswering = () => {
    const { questionNumber, gameQuestions } = this.state;
    if (questionNumber === (gameQuestions.length - 1)) {
      this.setState({
        overTime: true,
        timerOn: false,
        questionAnswered: true,
        redirectToFeedback: true,
      });
    } else {
      this.setState({
        overTime: true,
        timerOn: false,
        questionAnswered: true,
        nextButton: true,
      });
    }
  }

  checkAnswer = (userAnswer) => {
    const { gameQuestions, questionNumber } = this.state;
    const { correct_answer: correctAnswer } = gameQuestions[questionNumber];
    const { assertions, defineNumberCorrectAnswer } = this.props;
    if (userAnswer === correctAnswer) {
      defineNumberCorrectAnswer(assertions + 1);
      this.calculateAndUpdateScore();
    }
    this.handleEndOfAnswering();
  }

  clickNextButton = () => {
    const { questionNumber } = this.state;
    this.setState({
      questionNumber: questionNumber + 1,
      nextButton: false,
      timerOn: true,
      questionAnswered: false,
      overTime: false,
    });
  }

  selectClass = (answer, correctAnswer) => {
    const { questionAnswered } = this.state;
    if (questionAnswered) {
      const className = answer === correctAnswer
        ? 'mx-1 btn btn-success'
        : 'mx-1 btn btn-danger';
      return className;
    }
    return 'mx-1 btn btn-light';
  }

  isOverTime = (overTime) => {
    if (overTime) {
      this.handleEndOfAnswering();
    }
  }

  render() {
    const {
      gameQuestions,
      questionNumber,
      overTime,
      timerOn,
      nextButton,
      questionAnswered,
      redirectToFeedback,
      arrayOfAnswers } = this.state;
    return (
      <>
        {redirectToFeedback && <Redirect to="/feedback" />}
        <Header />
        <main>
          {gameQuestions.length > 0 && (
            <div>
              <h2 data-testid="question-category">
                {decode(gameQuestions[questionNumber].category)}
              </h2>
              <h3 data-testid="question-text">
                {decode(gameQuestions[questionNumber].question)}
              </h3>
              <div data-testid="answer-options">
                {arrayOfAnswers[questionNumber].map((answer, index) => (
                  <button
                    key={ `answer${index}` }
                    type="button"
                    onClick={ () => this.checkAnswer(answer) }
                    data-testid={
                      answer === gameQuestions[questionNumber].correct_answer
                        ? 'correct-answer'
                        : `wrong-answer-${gameQuestions[
                          questionNumber
                        ].incorrect_answers.indexOf(answer)}`
                    }
                    disabled={ overTime || questionAnswered }
                    className={ this.selectClass(
                      answer,
                      gameQuestions[questionNumber].correct_answer,
                    ) }
                  >
                    {answer}
                  </button>
                ))}
                {!nextButton && (
                  <Timer
                    isOverTime={ this.isOverTime }
                    timerOn={ timerOn }
                    getTime={ this.getTime }
                  />
                )}
              </div>
              {nextButton && (
                <button
                  className="my-3 btn btn-secondary"
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.clickNextButton }
                >
                  Next
                </button>
              )}
            </div>
          )}
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  score: state.player.score,
  assertions: state.player.assertions,

});

const mapDispatchToProps = (dispatch) => ({
  saveNewToken: (token) => dispatch(addToken(token)),
  updateScoreDispatch: (payload) => dispatch(updateScore(payload)),
  defineNumberCorrectAnswer: (payload) => dispatch(updateCorrectAnswers(payload)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  saveNewToken: PropTypes.func.isRequired,
  updateScoreDispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  defineNumberCorrectAnswer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
