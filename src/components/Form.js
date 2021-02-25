import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchCurrency, changeExpense } from '../actions';

const basicExpense = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: [],
};

class Form extends Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.handleCurrencies = this.handleCurrencies.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdition = this.handleEdition.bind(this);

    this.state = {
      isEditing: false,
      expenses: basicExpense,
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleInput({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      expenses: { ...prevState.expenses, [name]: value },
    }));
  }

  handleCurrencies() {
    const { currenciesKeys } = this.props;
    const filteredCurrencies = currenciesKeys.filter((currency) => currency !== 'USDT');

    return (
      filteredCurrencies.map((currency) => (
        <option key={ currency } value={ currency } data-testid={ currency }>
          {currency}
        </option>
      ))
    );
  }

  handleSubmit() {
    const { fetchCurrencies, currencies, addExpenses } = this.props;
    const { expenses: { value, currency }, total } = this.state;
    const exchangeCurrency = parseFloat(value * currencies[currency].ask);
    const sumOfExpenses = Math.round((total + exchangeCurrency) * 100) / 100;
    fetchCurrencies();
    this.setState((prevState) => ({
      ...prevState,
      expenses: { ...prevState.expenses, exchangeRates: { ...currencies } },
      total: sumOfExpenses,
    }), () => {
      addExpenses(this.state);
      this.setState({ expenses: basicExpense });
    });
  }

  handleEdition() {
    const { expenses } = this.state;
    const { changeExpenses } = this.props;
    changeExpenses(expenses);
    this.setState({ isEditing: false, expenses: basicExpense });
  }

  render1() {
    const { expenses: { value } } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Valor da despesa:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleInput }
          />
        </label>
      </div>
    );
  }

  render2() {
    const { expenses: { description } } = this.state;
    return (
      <div>
        <label htmlFor="description">
          Descrição da despesa:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleInput }
          />
        </label>
      </div>
    );
  }

  render3() {
    const { expenses: { currency } } = this.state;
    return (
      <div>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleInput }
          >
            {this.handleCurrencies()}
          </select>
        </label>
      </div>
    );
  }

  render4() {
    const { expenses: { method } } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          id="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleInput }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  render5() {
    const { expenses: { tag } } = this.state;
    return (
      <select
        name="tag"
        id="tag"
        data-testid="tag-input"
        value={ tag }
        onChange={ this.handleInput }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  render6() {
    return (
      <>
        <div>
          <label htmlFor="tag">
            Categoria da despesa:
            { this.render5() }
          </label>
        </div>
        <div>
          <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </div>
      </>
    );
  }

  render7() {
    return (
      <>
        <div>
          <label htmlFor="tag">
            Categoria da despesa:
            { this.render5() }
          </label>
        </div>
        <div>
          <button type="button" onClick={ this.handleEdition }>Editar despesa</button>
        </div>
      </>
    );
  }

  render() {
    const { editingExpense } = this.props;
    const { isEditing } = this.state;
    if (editingExpense && !isEditing) {
      this.setState({ expenses: editingExpense, isEditing: true });
    }
    return (
      <form>
        { this.render1() }
        { this.render2() }
        { this.render3() }
        <div>
          { this.render4() }
        </div>
        { !isEditing ? this.render6() : this.render7() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesKeys: Object.keys(state.wallet.currencies),
  currencies: state.wallet.currencies,
  editingExpense: state.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrency()),
  addExpenses: (state) => dispatch(addExpense(state)),
  changeExpenses: (expense) => dispatch(changeExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  changeExpenses: PropTypes.func.isRequired,
  currenciesKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencies: PropTypes.instanceOf(Object).isRequired,
  editingExpense: PropTypes.instanceOf(Object).isRequired,
};
