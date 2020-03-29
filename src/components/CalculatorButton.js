import React from 'react';
import PropTypes from 'prop-types';
import './CalculatorButton.scss';

class CalculatorButton extends React.Component {
  render() {
    const className = [
      'btn-calculator d-flex align-items-center justify-content-center',
      this.props.className
    ].join(' ');

    return (
      <div id={this.props.id} className={className} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

CalculatorButton.defaultProps = {
  onClick(){}
};

CalculatorButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default CalculatorButton;