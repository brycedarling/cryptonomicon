import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CandlestickChart from './CandlestickChart';
import VolumeChart from './VolumeChart';
import CurrencyPairSelector from './CurrencyPairSelector';
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
        <CurrencyPairSelector />
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

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  loadTicks: () => {
    dispatch(actions.loadTicks);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
