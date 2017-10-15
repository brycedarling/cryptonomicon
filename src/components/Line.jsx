import React, { Component } from 'react';
import { line } from 'd3-shape';

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
        style={{
          fill: 'none',
          shapeRendering: 'crispEdges',
          stroke: this.props.stroke || 'steelblue',
          strokeWidth: this.props.strokeWidth || 1,
        }}
        d={this.line(this.props.data)}
      />
    );
  }
}

export default Line;
