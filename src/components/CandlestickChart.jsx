import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent, min, max } from 'd3-array';
import Margin from './Margin';
import Axis from './Axis';
import Line from './Line';

class CandlestickChart extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,

    height: PropTypes.number.isRequired,

    margin: PropTypes.shape({
      bottom: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    }).isRequired,

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

  get outerWidth() {
    const { margin } = this.props;
    return this.props.width + margin.left + margin.right;
  }

  get outerHeight() {
    const { margin } = this.props;
    return this.props.height + margin.top + margin.bottom;
  }

  get innerWidth() {
    const { margin } = this.props;
    return this.props.width - margin.left - margin.right;
  }

  get innerHeight() {
    const { margin } = this.props;
    return this.props.height - margin.top - margin.bottom;
  }

  get xScale() {
    return scaleTime()
      .domain(extent(this.props.data, d => d.date))
      .range([0, this.innerWidth]);
  }

  get yScale() {
    return scaleLinear()
      .domain([
        min(this.props.data, d => d.low),
        max(this.props.data, d => d.high),
      ])
      .range([this.innerHeight, 0]);
  }

  render() {
    const { margin } = this.props;
    const {
      outerWidth, outerHeight, innerWidth, innerHeight, xScale, yScale,
    } = this;

    return (
      <svg
        className="candlestick-chart"
        width={outerWidth}
        height={outerHeight}
      >
        <Margin
          top={margin.top}
          left={margin.left}
          bottom={margin.bottom}
          right={margin.right}
        >
          <Axis
            label={{ text: 'Date', transform: `translate(${innerWidth / 2}, ${margin.bottom + 5})` }}
            className="x-axis"
            orientation="bottom"
            scale={xScale}
            transform={`translate(0, ${innerHeight})`}
          />
          <Axis
            label={{ text: 'Price', transform: `rotate(-90) translate(${-innerHeight / 2},${-margin.left + 15})` }}
            className="y-axis"
            orientation="left"
            scale={yScale}
          />
          <Line
            x={d => xScale(d.date)}
            y={d => yScale(d.close)}
            data={this.props.data}
          />
          <Line
            x={d => xScale(d.date)}
            y={d => yScale(d.open)}
            data={this.props.data}
            stroke="green"
          />
          <Line
            x={d => xScale(d.date)}
            y={d => yScale(d.high)}
            data={this.props.data}
            stroke="red"
          />
          <Line
            x={d => xScale(d.date)}
            y={d => yScale(d.low)}
            data={this.props.data}
            stroke="yellow"
          />
        </Margin>
      </svg>
    );
  }
}

const mapStateToProps = state => ({
  data: state.ticks.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CandlestickChart);
