import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scaleLinear, scaleTime } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { extent, max } from 'd3-array';
import { actions } from '../reducers';
import './VolumeChart.css';

class VolumeChart extends Component {
  componentWillMount() {
    this.props.loadTicks();
  }

  componentDidMount() {
    this.renderVolumeChart();
  }

  componentDidUpdate() {
    this.renderVolumeChart();
  }

  renderVolumeChart() {
    if (!this.props.ticks) return;

    this.props.ticks.forEach(tick => {
      if (typeof tick.date === 'number') {
        tick.date = new Date(tick.date * 1000)
      }
    });

    // Set the dimensions of the canvas / graph
    const margin = { top: 30, right: 20, bottom: 30, left: 50 },
          width = 600 - margin.left - margin.right,
          height = 270 - margin.top - margin.bottom;

    // Scale the range of the tick data
    const xScale = scaleTime()
      .domain(extent(this.props.ticks, d => d.date))
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, max(this.props.ticks, d => d.volume / 1000000)])
      .range([height, 0]);

    // Define the axes
    const xAxis = axisBottom(xScale),
          yAxis = axisLeft(yScale);

    // Define the line
    const valueline = line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.volume / 1000000));

    // Adds the svg canvas
    const svg = select(this.svg)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    // Adds the margin group
    const marginG = svg//.select('g.margin')
      //.data([1])
      //.enter()
        .append('g')
          .attr('class', 'margin')
          .attr('transform',
                `translate(${margin.left},${margin.top})`);

    // Add the valueline path.
    marginG//.select('path.line')
      //.data([1])
      //.enter()
        .append('path')
          .attr('class', 'line')
          .attr('d', valueline(this.props.ticks));

    // Add the X-Axis
    marginG//.select('g.x-axis')
      //.data([1])
      //.enter()
        .append('g')
          .attr('class', 'x-axis')
          .attr('transform', `translate(0,${height})`)
          .call(xAxis);

    // Add the Y-Axis
    marginG//.select('g.y-axis')
      //.data([1])
      //.enter()
        .append('g')
          .attr('class', 'y-axis')
          .call(yAxis);
  }

  render() {
    return <svg ref={svg => this.svg = svg} />
  }
}

const mapStateToProps = (state) => ({
  ticks: state.ticks.data,
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
