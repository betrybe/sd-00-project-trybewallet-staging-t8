import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { removeExpense, editExpense } from '../actions';

class Table extends Component {
  constructor() {
    super();

    this.renderTable = this.renderTable.bind(this);
    this.hC = this.hC.bind(this);
  }

  hC(expense) {
    const { changeExpense } = this.props;
    changeExpense(expense);
  }

  renderLastsTds(removeExpenses, convValue, expense) {
    return (
      <>
        <td>Real</td>
        <td>
          <button type="button" data-testid="edit-btn" onClick={ () => this.hC(expense) }>
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => removeExpenses(expense, convValue) }
          >
            Excluir
          </button>
        </td>
      </>
    );
  }

  renderFirst3td(description, tag, method) {
    return (
      <>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
      </>
    );
  }

  renderTable(expense, key) {
    const { removeExpenses } = this.props;
    const { id, description, method, tag, value, currency, exchangeRates } = expense;
    const currentCurrency = Object.values(exchangeRates).find(
      (item) => item.code === currency,
    );
    const { name, ask } = currentCurrency;
    const convValue = Math.round(ask * value * 100) / 100;
    return (
      <tr id={ id } key={ key }>
        { this.renderFirst3td(description, tag, method) }
        <td>{value}</td>
        <td>{name}</td>
        <td>{parseFloat(ask).toFixed(2)}</td>
        <td>{convValue}</td>
        { this.renderLastsTds(removeExpenses, convValue, expense) }
      </tr>
    );
  }

  renderTr() {
    return (
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          { this.renderTr() }
        </thead>
        <tbody>
          {expenses.length !== 0
          && expenses.map((expense) => this.renderTable(expense, expense.id))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (expense, convValue) => dispatch(removeExpense(expense, convValue)),
  changeExpense: (expense) => dispatch(editExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Object).isRequired,
  removeExpenses: PropTypes.func.isRequired,
  changeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
