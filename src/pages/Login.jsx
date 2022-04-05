import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
      buttonDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => this.validate());
  }

  validate = () => {
    const { name, gravatarEmail } = this.state;
    // regex retirado de https://regexr.com/3e48o
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (name !== '' && gravatarEmail.match(re)) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
  }

    handleClick = () => {}

    handleClickButtonSettings = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    render() {
      const { name, gravatarEmail, buttonDisable } = this.state;
      return (
        <form>
          <input
            data-testid="input-player-name"
            name="name"
            placeholder="Nome de Usuário"
            onChange={ this.handleChange }
            value={ name }
          />

          <input
            data-testid="input-gravatar-email"
            name="gravatarEmail"
            placeholder="E-mail"
            onChange={ this.handleChange }
            value={ gravatarEmail }
          />

          <button
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClick }
            disabled={ buttonDisable }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClickButtonSettings }
          >
            Configurações
          </button>

        </form>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
