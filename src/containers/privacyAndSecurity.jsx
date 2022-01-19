import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/privacyAndSecurity';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    privacyAndSecurity: state.pages.settings.privacyAndSecurity,
    currentUser: state.currentUser,
    records: state.records,
    theme: state.theme
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
    changeInputValue: bindActionCreators(ActionCreators.changeInputValue, dispatch),
    changePasswordVisibility: bindActionCreators(ActionCreators.changePasswordVisibility, dispatch),
    updateCurrentUser: bindActionCreators(ActionCreators.updateCurrentUser, dispatch),
    confirmNewPassword: bindActionCreators(ActionCreators.confirmNewPassword, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
