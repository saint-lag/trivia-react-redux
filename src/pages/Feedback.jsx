import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Feedback extends Component {
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
          data-testid="btn-ranking"
          type="button"
          onClick={ () => this.handleClick() }
        >
          Ranking

        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  numberCorrectAnswers: state.player.correctAnswers,
});

Feedback.propTypes = {
  numberCorrectAnswers: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
