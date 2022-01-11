import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/registration';
import * as CommonActionCreators from '../actions/actionCreators';
import * as RegistrationActionCreators from '../actions/registration/actionCreators';

const mapStateToProps = (state) => {
  return state.pages.registration;
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue: bindActionCreators(CommonActionCreators.changeInputValue, dispatch),
    changePasswordVisibility: bindActionCreators(CommonActionCreators.changePasswordVisibility, dispatch),
    backToLoginPage: bindActionCreators(RegistrationActionCreators.backToLoginPage, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
