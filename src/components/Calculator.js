import React from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import './Calculator.scss';

// Operators constants
const OPERATOR_DIVIDE = '/';
const OPERATOR_SUSTRACT = '-';
const OPERATOR_ADD = '+';
const OPERATOR_MULTIPLY = '*';
const OPERATOR_DECIMAL = '.';

// Initial state
// Used by the clear button
const initialState = {
  total: null,
  displayValue: '0',
  operation: '',
  shouldClearDisplayValueNextTime: false,
  shouldClearOperationNextTime: false
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};

    this.handleAnyClick = this.handleAnyClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleClickNumber = this.handleClickNumber.bind(this);
    this.handleClickEquals = this.handleClickEquals.bind(this);
    this.renderNumberButton = this.renderNumberButton.bind(this);
    this.renderOperatorButton = this.renderOperatorButton.bind(this);
  }

  handleClear() {
    this.setState({
      ...initialState
    });
  }

  handleAnyClick(symbol, specificSetState) {
    // If the display is in this array
    // and if the user type this symbol again, we do nothing
    const displayValueLength = this.state.displayValue.length;
    if (displayValueLength > 0) {
      const excludeSymbolRepeat = [OPERATOR_DECIMAL, OPERATOR_DIVIDE, OPERATOR_MULTIPLY, OPERATOR_SUSTRACT, OPERATOR_ADD];
      const displayValueLastChar = String(this.state.displayValue).charAt(displayValueLength-1);
      const excludeSymbolIndex = excludeSymbolRepeat.indexOf(String(symbol));
      if ((excludeSymbolIndex !== -1) && (excludeSymbolIndex === excludeSymbolRepeat.indexOf(displayValueLastChar))) {
        console.warn(`Cannot repeat symbol ${symbol}`);
        return false;
      }
    }

    // Create the new state
    const state = {
      ...this.state,
      displayValue: this.state.shouldClearDisplayValueNextTime ? initialState.displayValue : this.state.displayValue,
      operation: this.state.shouldClearOperationNextTime ? initialState.operation : this.state.operation
    };
    this.setState({
      ...state,
      ...specificSetState(state)
    });
  }

  handleClickNumber(number) {
    // If the display already contains a DECIMAL_OPERATOR, we do nothing
    if (number === OPERATOR_DECIMAL && this.state.displayValue.indexOf(OPERATOR_DECIMAL) !== -1) {
      return false;
    }

    // If display value is 0 and we type 0, we do nothing
    if (this.state.displayValue === '0' && number === 0) {
      return false;
    }

    this.handleAnyClick(number, (state) => {
      // If the display value is 0 and we type another number than 0, replace
      state.displayValue = (state.displayValue === '0') ? String(number) : state.displayValue.concat(number);

      return {
        total: initialState.total,
        displayValue: state.displayValue,
        operation: state.operation.concat(number),
        shouldClearDisplayValueNextTime: false,
        shouldClearOperationNextTime: false
      };
    });
  }

  handleClickOperator(operator) {
    this.handleAnyClick(operator, (state) => {
      let operation = state.operation;
      
      // By default, when an operator is typed, it replace all the operators before
      // If this is a sustract, we can add it
      if (operator !== OPERATOR_SUSTRACT && operation.length > 0) {
        let lastChar = operation.charAt(operation.length - 1);
        while ([OPERATOR_ADD, OPERATOR_DIVIDE, OPERATOR_MULTIPLY, OPERATOR_SUSTRACT].indexOf(lastChar) !== -1) {
          operation = operation.slice(0, operation.length -1); 
          lastChar = operation.charAt(operation.length - 1);
        }
      }

      return {
        displayValue: operator,
        operation: (state.total !== null ? String(state.total) : operation).concat(operator),
        shouldClearDisplayValueNextTime: true,
        shouldClearOperationNextTime: false
      }
    });
  }

  handleClickEquals() {
    if (this.state.operation) {
      try {
        /* eslint no-eval: 0 */
        const total = eval(this.state.operation);
        console.log(total);
        this.setState((state) => ({
          total,
          displayValue: String(total),
          operation: state.operation ? state.operation.concat(` = ${total}`) : total,
          shouldClearDisplayValueNextTime: true,
          shouldClearOperationNextTime: true
        }));
      }
      catch (e) {
        console.error(e);
      }
    }
  }

  renderOperatorButton(operator) {
    const attributes = {
      innerHTML: operator,
      id: undefined,
      onClick: this.handleClickOperator.bind(this, operator)
    };

    switch(operator) {
      case OPERATOR_ADD:
        attributes.id = 'add';
        break;

      case OPERATOR_SUSTRACT:
        attributes.innerHTML = <span>&ndash;</span>;
        attributes.id = 'subtract';
        break;

      case OPERATOR_MULTIPLY: 
        attributes.innerHTML = <span>&times;</span>;
        attributes.id = 'multiply';
        break;

      case OPERATOR_DIVIDE: 
        attributes.innerHTML = <span>&divide;</span>;
        attributes.id = 'divide';
        break;

      default:
        throw Error('Operator not supported');
    }

    return (
      <CalculatorButton id={attributes.id} className="btn-dark" onClick={attributes.onClick}>
        {attributes.innerHTML}
      </CalculatorButton>
    );
  }

  renderNumberButton(number) {
    const idsByNumber = {
      '0': 'zero',
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine',
    };
    idsByNumber[OPERATOR_DECIMAL] = 'decimal';
    
    return (
      <CalculatorButton
        id={idsByNumber[number]}
        className="btn-secondary"
        onClick={this.handleClickNumber.bind(this, number)}
      >
        {number}
      </CalculatorButton>
    );
  }

  render() {
    return (
      <table className="calculator">
        <tbody>
          <tr>
            <td colSpan="4">
              <CalculatorDisplay idDisplay="display" total={this.state.displayValue} operation={this.state.operation} />
            </td>
          </tr>
          <tr rowSpan="2">
            <td colSpan="2">
              <CalculatorButton
                id="clear"
                className="btn-danger"
                onClick={this.handleClear}
              >
                AC
              </CalculatorButton>
            </td>
            <td>
              {this.renderOperatorButton(OPERATOR_DIVIDE)}
            </td>
            <td>
            {this.renderOperatorButton(OPERATOR_MULTIPLY)}

            </td>
          </tr>
          <tr>
            <td>
              {this.renderNumberButton(7)}
            </td>
            <td>
              {this.renderNumberButton(8)}
            </td>
            <td>
              {this.renderNumberButton(9)}
            </td>
            <td>
              {this.renderOperatorButton(OPERATOR_SUSTRACT)}
            </td>
          </tr>
          <tr>
            <td>
              {this.renderNumberButton(4)}
            </td>
            <td>
              {this.renderNumberButton(5)}
            </td>
            <td>
              {this.renderNumberButton(6)}
            </td>
            <td>
              {this.renderOperatorButton(OPERATOR_ADD)}
            </td>
          </tr>
          <tr>
            <td>
              {this.renderNumberButton(1)}
            </td>
            <td>
              {this.renderNumberButton(2)}
            </td>
            <td>
              {this.renderNumberButton(3)}
            </td>
            <td rowSpan="2">
              <CalculatorButton
                id="equals"
                className="btn-success"
                onClick={this.handleClickEquals}
              >
                =
              </CalculatorButton>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              {this.renderNumberButton(0)}
            </td>
            <td>
              {this.renderNumberButton(OPERATOR_DECIMAL)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Calculator;