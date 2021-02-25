// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  GET_CURRENCY, ADD_EXPENSE, REMOVE_EXPENSE,
  EDIT_EXPENSE, EDIT_EXPENSE_DONE, CHANGE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpense: null,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY: return { ...state, currencies: action.currency };
  case ADD_EXPENSE: return { ...state,
    expenses: [
      ...state.expenses,
      { id: state.expenses.length, ...action.expense.expenses },
    ] };
  case CHANGE_EXPENSE: return { ...state,
    expenses: state.expenses.map((it) => (
      it.id !== action.expense.id ? it : action.expense)),
    editExpense: null };
  case REMOVE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((it) => it.id !== action.expense.id) };
  case EDIT_EXPENSE: return { ...state, editExpense: action.expense };
  case EDIT_EXPENSE_DONE: return { ...state, editExpense: null };
  default: return state;
  }
}
