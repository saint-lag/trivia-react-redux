import React, { Component } from 'react';

class Game extends Component {
  // constructor() {
  //   super();
  //   this.state = {

  //    }
  // }

  render() {
    return (
      <div>
        <h2
          data-testid="question-category"
        >
          Categoria
          {' '}
        </h2>
        <h3
          data-testid="question-text"
        >
          Pergunta
        </h3>
      </div>
    );
  }
}

export default Game;
