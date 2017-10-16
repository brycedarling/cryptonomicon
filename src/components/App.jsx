import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CandlestickChart from './CandlestickChart';
import VolumeChart from './VolumeChart';
import { actions } from '../reducers';

class App extends Component {
  static propTypes = {
    loadTicks: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadTicks();
  }

  render() {
    return (
      <div>
        <CandlestickChart
          width={600}
          height={270}
          margin={{
            top: 30, right: 20, bottom: 30, left: 50,
          }}
        />
        <VolumeChart
          width={600}
          height={270}
          margin={{
            top: 30, right: 20, bottom: 30, left: 50,
          }}
        />
      </div>
    );
  }
}

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

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  loadTicks,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
