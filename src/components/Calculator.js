import React from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import './Calculator.scss';

// Operators constants
const OPERATOR_DIVIDE = '/';
const OPERATOR_SUSTRACT = '-';
const OPERATOR_ADD = '+';
const OPERATOR_MULTIPLY = '*';

// Initial state
// Used by the clear button
const initialState = {
  displayValue: '',
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

  handleAnyClick() {
    return new Promise((resolve, _reject) => {
      this.setState({
        displayValue: this.state.shouldClearDisplayValueNextTime ? initialState.displayValue : this.state.displayValue,
        operation: this.state.shouldClearOperationNextTime ? initialState.operation : this.state.operation,
      }, resolve());
    });
  }

  handleClickNumber(number) {
    this.handleAnyClick().then(() => {
      this.setState((state) => ({
        displayValue: state.displayValue.concat(number),
        operation: state.operation.concat(number),
        shouldClearDisplayValueNextTime: false,
        shouldClearOperationNextTime: false
      }));
    });
  }

  handleClickOperator(operator) {
    this.handleAnyClick().then(() => {
      this.setState((state) => ({
        displayValue: operator,
        operation: state.operation.concat(operator),
        shouldClearDisplayValueNextTime: true,
        shouldClearOperationNextTime: false
      }));
    })
  }

  handleClickEquals() {
    this.handleAnyClick().then(() => {
      if (this.state.operation) {
        try {
          /* eslint no-eval: 0 */
          const total = eval(this.state.operation);
          this.setState((state) => ({
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
    })
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
      0: 'zero',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      '.': 'decimal'
    };
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
              <CalculatorDisplay idDisplay="display" total={this.state.displayValue || '0'} operation={this.state.operation} />
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
              {this.renderNumberButton('.')}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Calculator;