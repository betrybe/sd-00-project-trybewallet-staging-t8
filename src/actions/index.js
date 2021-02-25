import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

export const USER_REGISTER = 'USER_REGISTER';
export const GET_CURRENCY = 'GET_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const CHANGE_EXPENSE = 'CHANGE_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_EXPENSE_DONE = 'EDIT_EXPENSE_DONE';

export const userRegister = (email) => ({
  type: USER_REGISTER,
  email,
});

export const getCurrency = (currency) => ({
  type: GET_CURRENCY,
  currency,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const changeExpense = (expense) => ({
  type: CHANGE_EXPENSE,
  expense,
});
export const removeExpense = (expense, convValue) => ({
  type: REMOVE_EXPENSE,
  expense,
  convValue,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});
export const editExpenseDone = () => ({
  type: EDIT_EXPENSE_DONE,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const responseData = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJSON = await responseData.json();
    dispatch(getCurrency(responseJSON));
  };
}
