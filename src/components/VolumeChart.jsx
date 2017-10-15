import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent, max } from 'd3-array';
import { actions } from '../reducers';
import Margin from './Margin';
import Axis from './Axis';
import Line from './Line';
import './VolumeChart.css';

class VolumeChart extends Component {
  componentWillMount() {
    this.props.loadTicks();
  }

  get outerWidth() {
    const margin = this.props.margin;
    return this.props.width + margin.left + margin.right;
  }

  get outerHeight() {
    const margin = this.props.margin;
    return this.props.height + margin.top + margin.bottom;
  }

  get innerWidth() {
    const margin = this.props.margin;
    return this.props.width - margin.left - margin.right;
  }

  get innerHeight() {
    const margin = this.props.margin;
    return this.props.height - margin.top - margin.bottom;
  }

  get xScale() {
    return scaleTime()
      .domain(extent(this.props.data, d => d.date))
      .range([0, this.innerWidth]);
  }

  get yScale() {
    return scaleLinear()
      .domain([0, max(this.props.data, d => d.volume / 1000000)])
      .range([this.innerHeight, 0]);
  }

  render() {
    const margin = this.props.margin,
          outerWidth = this.outerWidth,
          outerHeight = this.outerHeight,
          innerWidth = this.innerWidth,
          innerHeight = this.innerHeight,
          xScale = this.xScale,
          yScale = this.yScale;

    return (
      <svg
        className="volume-chart"
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
            label={{text: 'Date', transform: `translate(${innerWidth / 2}, ${margin.bottom+5})`}}
            className="x-axis"
            orientation="bottom"
            scale={xScale}
            transform={`translate(0, ${innerHeight})`}
          />
          <Axis
            label={{text: 'Volume', transform: `rotate(-90) translate(${-innerHeight / 2},${-margin.left+15})`}}
            className="y-axis"
            orientation="left"
            scale={yScale}
          />
          <Line
            x={d => xScale(d.date)}
            y={d => yScale(d.volume / 1000000)}
            data={this.props.data}
          />
        </Margin>
      </svg>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.ticks.data,
});

function loadTicks() {
  return (dispatch, getState) => {
    const volumeChartUIState = getState().volumeChart.ui;

    const options = {
      currencyPair: volumeChartUIState.currencyPair,
      period: volumeChartUIState.period,
      start: volumeChartUIState.start,
    };

    if (volumeChartUIState.end) {
      options.end = volumeChartUIState.end;
    }

    actions.loadTicks(options)(dispatch);
  };
}

const mapDispatchToProps = {
  loadTicks,
};

export default connect(mapStateToProps, mapDispatchToProps)(VolumeChart);
