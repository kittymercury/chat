import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/profile';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    profile: state.pages.profile,
    currentUser: state.currentUser,
    records: state.records,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
    updateCurrentUser: bindActionCreators(ActionCreators.updateCurrentUser, dispatch),
    changeInputValue: bindActionCreators(ActionCreators.changeInputValue, dispatch),
    changeHelpMessage: bindActionCreators(ActionCreators.changeHelpMessage, dispatch),
    clearHelpMessage: bindActionCreators(ActionCreators.clearHelpMessage, dispatch),
    openAvatarMenu: bindActionCreators(ActionCreators.openAvatarMenu, dispatch),
    closeAvatarMenu: bindActionCreators(ActionCreators.closeAvatarMenu, dispatch),
    getCurrentUserData: bindActionCreators(ActionCreators.getCurrentUserData, dispatch),
    clearErrorMessage: bindActionCreators(ActionCreators.clearErrorMessage, dispatch),
    changeErrorMessage: bindActionCreators(ActionCreators.changeErrorMessage, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
