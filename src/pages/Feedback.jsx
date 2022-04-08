import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Feedback extends Component {
  handlePlayAgainBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { numberCorrectAnswers, score } = this.props;
    const minimalCorrectAnswers = 3;
    const message = numberCorrectAnswers < minimalCorrectAnswers
      ? 'Could be better...'
      : 'Well Done!';
    return (
      <>
        <h1 data-testid="feedback-text">{message}</h1>
        <label htmlFor="total-score">
          Sua pontuação:
          <h2 id="total-score" data-testid="feedback-total-score">{ score }</h2>
        </label>
        <label htmlFor="total-questions">
          Você acertou:
          <h2 id="total-questions" data-testid="feedback-total-question">
            { numberCorrectAnswers }
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
        <button type="button" data-testid="btn-next">
          Next
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  numberCorrectAnswers: state.player.correctAnswers,
  score: state.player.score,

});

Feedback.propTypes = {
  numberCorrectAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
