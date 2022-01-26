import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/settings';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
