import React from 'react';
import PropTypes from 'prop-types';

// Component
class SecureLink extends React.Component {
  render() {
    return (
      <a
        href={this.props.href}
        rel="noopener noreferrer"
        target={this.props.openInNewTab ? '_blank' : ''}
      >{this.props.children}</a>
    );
  }
}

// Prop types
SecureLink.propTypes = {
  href: PropTypes.string.isRequired,
  openInNewTab: PropTypes.bool
};

// Default props values
SecureLink.defaultProps = {
  openInNewTab: true
};

export default SecureLink;