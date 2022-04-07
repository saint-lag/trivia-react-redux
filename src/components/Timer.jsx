import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  timer = () => {
    const { time } = this.state;
    const { isOverTime, timerOn } = this.props;
    if (time > 0 && timerOn) {
      this.setState((prev) => ({ time: prev.time - 1 }));
    }
    if (time <= 0) {
      isOverTime(true);
    }
  }

  startTimer = () => {
    const second = 1000;
    setInterval(this.timer, second);
  }

  render() {
    const { time } = this.state;
    return (
      <>
        {' '}
        <h2>{time}</h2>
      </>
    );
  }
}

Timer.propTypes = {
  isOverTime: PropTypes.func,
  timerOn: PropTypes.bool,
}.isRequired;

export default Timer;
