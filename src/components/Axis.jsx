import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';
// import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import './Axis.css';

class Axis extends Component {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string.isRequired,

      PropTypes.shape({
        text: PropTypes.string.isRequired,
        transform: PropTypes.string,
        fill: PropTypes.string,
        fontSize: PropTypes.oneOfType([
          PropTypes.number.isRequired,
          PropTypes.string.isRequired,
        ]),
      }).isRequired,
    ]).isRequired,

    className: PropTypes.string,

    orientation: PropTypes.string.isRequired,

    scale: PropTypes.func.isRequired,

    transform: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    transform: '',
  };

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  get orientedAxis() {
    let axis;
    switch (this.props.orientation) {
      case 'bottom':
        axis = axisBottom(this.props.scale);
        break;
      case 'left':
        axis = axisLeft(this.props.scale);
        break;
      case 'right':
        axis = axisRight(this.props.scale);
        break;
      case 'top':
        axis = axisTop(this.props.scale);
        break;
      default:
        throw new Error('orientation must be one of bottom, left, right, or top');
    }

    // TODO: support other axis options like size and padding
    // if (this.props.ticks) {
    //   axis.ticks(this.props.ticks);
    // }

    return axis;
  }

  /*
  get scale() {
    // TODO: support all D3 scales, only linear and time needed for now
    // Continuous (Linear, Power, Log, Identity, Time)
    // Sequential
    // Quantize
    // Quantile
    // Threshold
    // Ordinal (Band, Point, Category)

    let scale;
    switch (this.props.scale) {
      case 'linear':
        scale = scaleLinear();
        break;
      case 'time':
        scale = scaleTime();
        break;
      default:
        throw new Error('scale must be one of linear or time');
    }

    if (this.props.domain) {
      scale.domain(this.props.domain);
    }

    if (this.props.range) {
      scale.range(this.props.range);
    }

    return scale;
  }
  */

  renderAxis() {
    const g = select(this.g)
      .call(this.orientedAxis);

    if (this.props.label) {
      g.selectAll('text')
        .data([this.props.label])
        .enter()
        .append('text')
        .attr('class', 'label')
        .style('text-anchor', 'middle')
        .style('font-size', this.props.label.fontSize || '11px')
        .style('fill', this.props.label.fill || '#000')
        .attr('transform', this.props.label.transform)
        .text(this.props.label.text || this.props.label)
        .exit()
        .remove();
    }
  }

  render() {
    return (
      <g
        className={`axis ${this.props.className}`}
        transform={this.props.transform}
        ref={(g) => { this.g = g; }}
      />
    );
  }
}

export default Axis;
