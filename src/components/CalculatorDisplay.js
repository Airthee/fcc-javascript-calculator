import React from 'react';
import PropTypes from 'prop-types';
import './CalculatorDisplay.scss';

class CalculatorDispaly extends React.Component {
  render() {
    return (
      <div className="calculator-display text-right">
        <div className="calculator-display--operation">{this.props.operation || <span>&nbsp;</span>}</div>
        <div id={this.props.idDisplay} className="calculator-display--total">{this.props.total}</div>
      </div>
    );
  }
}

CalculatorDispaly.propTypes = {
  idDisplay: PropTypes.string,
  total: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired
};

export default CalculatorDispaly;