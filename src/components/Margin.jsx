import React, { Component } from 'react';

class Margin extends Component {
  render() {
    return (
      <g
        className="margin"
        transform={`translate(${this.props.left}, ${this.props.top})`}
      >
        {this.props.children}
      </g>
    );
  }
}

export default Margin;
