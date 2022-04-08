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
    const { numberCorrectAnswers } = this.props;
    const minimalCorrectAnswers = 3;
    const message = numberCorrectAnswers < minimalCorrectAnswers
      ? 'Could be better...'
      : 'Well Done!';
    return (
      <>
        <span data-testid="feedback-text">{message}</span>
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
});

Feedback.propTypes = {
  numberCorrectAnswers: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
