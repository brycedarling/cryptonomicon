import React from 'react';
import PropTypes from 'prop-types';

const Margin = props => (
  <g
    className="margin"
    transform={`translate(${props.left}, ${props.top})`}
  >
    {props.children}
  </g>
);

Margin.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Margin;
