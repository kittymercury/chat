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
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    changePasswordVisibility: bindActionCreators(CommonActionCreators.changePasswordVisibility, dispatch),
    goToRegistrationPage: bindActionCreators(LoginActionCreators.goToRegistrationPage, dispatch),
    init: bindActionCreators(CommonActionCreators.init, dispatch),
    onLogin: bindActionCreators(LoginActionCreators.onLogin, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
