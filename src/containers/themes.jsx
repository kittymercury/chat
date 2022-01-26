import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/themes';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    themes: state.themes,
    currentTheme: state.currentTheme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTheme: bindActionCreators(ActionCreators.changeTheme, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
