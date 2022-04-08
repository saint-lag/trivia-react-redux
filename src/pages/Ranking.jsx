import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: JSON.parse(localStorage.getItem('ranking')),
    };
  }

  // comp

  // loadGamesInfo = () => {
  //   this.setState({
  //     ranking: JSON.parse(localStorage.getItem('ranking')),
  //   });
  // }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    console.log(ranking);
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          {ranking.sort((a, b) => b.score - a.score).map((game, index) => (
            <div key={ `ranking${index}` }>
              <img src={ game.picture } alt={ `Foto do ${game.name}` } />
              <span data-testid={ `player-name-${index}` }>
                {' '}
                {game.name}
                {' '}
              </span>
              <span data-testid={ `player-score-${index}` }>
                {' '}
                {game.score}
                {' '}
              </span>
            </div>))}
        </section>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
