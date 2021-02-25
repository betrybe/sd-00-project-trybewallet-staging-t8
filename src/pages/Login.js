import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userRegister } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin(e) {
    const { addUser, history } = this.props;
    const { email } = this.state;

    e.preventDefault();
    addUser(email);

    history.push('/carteira');
  }

  validateEmailAndPassword() {
    const { email, password } = this.state;

    const mailFormat = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    const SIX = 6;

    if (email.match(mailFormat) && password.length >= SIX) {
      document.querySelector('#login-button').removeAttribute('disabled');
    } else {
      document.querySelector('#login-button').setAttribute('disabled', true);
    }
  }

  handleInput({ target: { name, value } }) {
    this.setState(
      {
        [name]: value,
      },
      () => this.validateEmailAndPassword(),
    );
  }

  render1stInput() {
    return (
      <input
        data-testid="email-input"
        type="text"
        name="email"
        placeholder="exemplo@exemplo.com"
        onChange={ this.handleInput }
      />
    );
  }

  render() {
    return (
      <form onSubmit={ this.submitLogin }>
        { this.render1stInput() }
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={ this.handleInput }
        />
        <button type="submit" id="login-button" disabled>
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(userRegister(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addUser: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};
