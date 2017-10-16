import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { line } from 'd3-shape';

class Line extends Component {
  static propTypes = {
    x: PropTypes.func.isRequired,

    y: PropTypes.func.isRequired,

    stroke: PropTypes.string,

    strokeWidth: PropTypes.number,

    data: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      open: PropTypes.number.isRequired,
      high: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
      close: PropTypes.number.isRequired,
      volume: PropTypes.number.isRequired,
      quoteVolume: PropTypes.number.isRequired,
      weightedAverage: PropTypes.number.isRequired,
    })).isRequired,
  };

  static defaultProps = {
    stroke: 'steelblue',
    strokeWidth: 1,
  };

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
          stroke: this.props.stroke,
          strokeWidth: this.props.strokeWidth,
        }}
        d={this.line(this.props.data)}
      />
    );
  }
}

export default Line;
