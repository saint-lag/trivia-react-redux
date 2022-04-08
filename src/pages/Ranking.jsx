import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">TEMPORARY: Ranking Title</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar à Login
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.node.isRequired,
};

export default Ranking;
