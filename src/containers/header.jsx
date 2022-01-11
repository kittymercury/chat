import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/header';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return state.header;
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSearch: bindActionCreators(ActionCreators.openSearch, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
