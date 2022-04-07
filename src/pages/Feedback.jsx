import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Feedback extends Component {
  render() {
    const { numberCorrectAnswers } = this.props;
    const minimalCorrectAnswers = 3;
    const message = numberCorrectAnswers < minimalCorrectAnswers
      ? 'Could be better...'
      : 'Well Done!';
    return (
      <span
        data-testid="feedback-text"
      >
        {message}
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  numberCorrectAnswers: state.player.correctAnswers,
});

Feedback.propTypes = {
  numberCorrectAnswers: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
