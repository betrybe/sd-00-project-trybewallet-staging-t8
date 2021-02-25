// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_REGISTER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_REGISTER:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
