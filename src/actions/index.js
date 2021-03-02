// Coloque aqui suas actions
import { LOGIN } from '../consts';

export function login(credentials) {
  return ({
    type: LOGIN,
    payload: credentials,
  });
}

export function otherAction(){
    return false
}
