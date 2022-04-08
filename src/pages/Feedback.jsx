import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import { updateCorrectAnswers } from '../actions';

class Feedback extends Component {
  handlePlayAgainBtn = () => {
    const { history, setAnsweredToZero } = this.props;
    setAnsweredToZero(0);
    history.push('/');
  };

  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const minimalCorrectAnswers = 3;
    const message = assertions < minimalCorrectAnswers
      ? 'Could be better...'
      : 'Well Done!';
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">{message}</h1>
        <label htmlFor="total-score">
          Sua pontuação:
          <h2 id="total-score" data-testid="feedback-total-score">{ score }</h2>
        </label>
        <label htmlFor="total-questions">
          Você acertou:
          <h2 id="total-questions" data-testid="feedback-total-question">
            { assertions }
          </h2>
        </label>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.handlePlayAgainBtn() }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => this.handleClick() }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-next"
          // onClick={ setAnsweredToZero(0) }
        >
          Next
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  setAnsweredToZero: (payload) => dispatch(updateCorrectAnswers(payload)),
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setAnsweredToZero: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
