import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToken, addLogin, addGravatarPicture } from '../actions/index';
import searchTokenAPI from '../services/searchTokenApi';
import fetchGravatarPicture from '../services/fetchGravatarPicture';
// import store from '../store/index';

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

    handleClick = async () => {
      const token = await searchTokenAPI();
      // console.log(await searchTokenAPI());
      const { history, updateToken, updatePlayer, updatePicture } = this.props;
      const { gravatarEmail, name } = this.state;
      const payload = { gravatarEmail, name };

      const picture = fetchGravatarPicture(gravatarEmail);

      updatePicture(picture);
      updateToken(token);
      updatePlayer(payload);
      history.push('/game');
    }

    handleClickButtonSettings = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    render() {
      const { name, gravatarEmail, buttonDisable } = this.state;
      // console.log(this.props);
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

const mapDispatchToProps = (dispatch) => ({
  updateToken: (token) => dispatch(addToken(token)),
  updatePlayer: (payload) => dispatch(addLogin(payload)),
  updatePicture: (picture) => dispatch(addGravatarPicture(picture)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
