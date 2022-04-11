import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
// import { updateCorrectAnswers } from '../actions';

class Feedback extends Component {
  componentDidMount() {
    this.saveOnStorage();
  }

  saveOnStorage = () => {
    const { name, score, picture } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const tempObj = {
      name,
      score,
      picture,
    };
    const newRanking = [...ranking, tempObj];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  handlePlayAgainBtn = () => {
    const { history } = this.props;
    // setAnsweredToZero(0);
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
        <main>
          <h1 className="my-3" data-testid="feedback-text">
            {message}
          </h1>
          <label className="mx-2" htmlFor="total-score">
            Sua pontuação:
            <h2
              className="mx-2"
              id="total-score"
              data-testid="feedback-total-score"
            >
              {score}
            </h2>
          </label>
          <label className="mx-2" htmlFor="total-questions">
            Você acertou:
            <h2
              className="mx-2"
              id="total-questions"
              data-testid="feedback-total-question"
            >
              {assertions}
            </h2>
          </label>
          <button
            style={ { backgroundColor: '#5a189a' } }
            className="mx-1 btn btn-primary"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => this.handlePlayAgainBtn() }
          >
            Play Again
          </button>
          <button
            style={ { backgroundColor: '#0077b6' } }
            className="mx-1 btn btn-primary"
            data-testid="btn-ranking"
            type="button"
            onClick={ () => this.handleClick() }
          >
            Ranking
          </button>
          {/* <button
            className="mx-1 btn btn-secondary"
            type="button"
            data-testid="btn-next"
            // onClick={ setAnsweredToZero(0) }
          >
            Next
          </button> */}
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  name: state.player.name,
  score: state.player.score,
  picture: state.player.picture,
});

// const mapDispatchToProps = (dispatch) => ({
//   setAnsweredToZero: (payload) => dispatch(updateCorrectAnswers(payload)),
// });

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  // setAnsweredToZero: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
