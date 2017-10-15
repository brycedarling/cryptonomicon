import React, { Component } from 'react';
import { line } from 'd3-shape';
import './Line.css';

class Line extends Component {
  get line() {
    return line()
      .x(this.props.x)
      .y(this.props.y);
  }

  render() {
    return (
      <path
        className="line"
        d={this.line(this.props.data)}
      />
    );
  }
}

export default Line;
