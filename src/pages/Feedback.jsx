import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Feedback extends Component {
  handlePlayAgainBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { numberCorrectAnswers } = this.props;
    const minimalCorrectAnswers = 3;
    const message = numberCorrectAnswers < minimalCorrectAnswers
      ? 'Could be better...'
      : 'Well Done!';
    return (
      <>
        <span
          data-testid="feedback-text"
        >
          {message}
        </span>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.handlePlayAgainBtn() }
        >
          Play Again
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
