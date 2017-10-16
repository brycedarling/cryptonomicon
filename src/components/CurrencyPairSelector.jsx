import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../reducers';
import './CurrencyPairSelector.css';

const CurrencyPairSelector = props => (
  <div>
    <button
      className={props.currencyPair === 'USDT_BTC' ? 'selected' : ''}
      onClick={() => props.setCurrencyPair('USDT_BTC')}
    >
      BTC
    </button>
    <button
      className={props.currencyPair === 'USDT_ETH' ? 'selected' : ''}
      onClick={() => props.setCurrencyPair('USDT_ETH')}
    >
      ETH
    </button>
    <button
      className={props.currencyPair === 'USDT_LTC' ? 'selected' : ''}
      onClick={() => props.setCurrencyPair('USDT_LTC')}
    >
      LTC
    </button>
    <span>
      {(props.loading ? 'Loading...' : '')}
    </span>
  </div>
);

CurrencyPairSelector.propTypes = {
  loading: PropTypes.bool.isRequired,
  currencyPair: PropTypes.string.isRequired,
  setCurrencyPair: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.ticks.ui.loading,
  currencyPair: state.ticks.ui.currencyPair,
});

const mapDispatchToProps = {
  setCurrencyPair: actions.setCurrencyPair,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPairSelector);
