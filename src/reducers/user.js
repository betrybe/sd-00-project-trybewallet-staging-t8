// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../consts';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload.email, password: action.payload.password };

  default:
    return state;
  }
}

export default user;
