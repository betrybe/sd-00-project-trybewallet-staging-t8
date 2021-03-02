import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login as loginAction } from '../actions';

const MIN_CHARACTER = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      fieldsIsValid: false,
    };
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      this.validateFields(email, password);
    });
  }

  validateFields(email, password) {
    if (this.validateEmail(email) && this.validatePassword(password)) {
      this.setState({ fieldsIsValid: true });
    } else {
      this.setState({ fieldsIsValid: false });
    }
  }

  validateEmail(email) {
    const parts = email.split('@');
    if (parts.length === 2) {
      const newParts = parts[1].split('.');
      if (newParts.length === 2 && newParts[1] !== '') return true;
    }

    return false;
  }

  validatePassword(password) {
    if (password.length >= MIN_CHARACTER) return true;
    return false;
  }

  render() {
    const { fieldsIsValid, email, password } = this.state;
    const { login, history } = this.props;
    return (
      <>
        <label htmlFor="input-email">
          Email
          <input
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-password">
          Senha
          <input
            type="text"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !fieldsIsValid }
          onClick={ () => {
            login({ email, password });
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (credentials) => dispatch(loginAction(credentials)),
  };
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
