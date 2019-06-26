import React, { Component } from 'react';
import Navigation from '../../Components/Navigation/Navigation'
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    return (
      <Navigation { ...this.props } />
    );
  }
}
DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;
export default DefaultHeader;
