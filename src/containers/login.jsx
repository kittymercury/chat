import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/login';
import * as CommonActionCreators from '../actions/actionCreators';
import * as LoginActionCreators from '../actions/login/actionCreators';

const mapStateToProps = (state) => {
  return state.pages.login;
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue: bindActionCreators(CommonActionCreators.changeInputValue, dispatch),
    onLogin: bindActionCreators(LoginActionCreators.login, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
