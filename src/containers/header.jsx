import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/header';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    header: state.header,
    location: state.location,
    profile: state.pages.profile,
    currentUser: state.currentUser,
    theme: state.theme,
    messageToForward: state.messageToForward,
    selectedMessages: state.selectedMessages
    // records: state.records
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
    openSearch: bindActionCreators(ActionCreators.openSearch, dispatch),
    editProfile: bindActionCreators(ActionCreators.editProfile, dispatch),
    cancelForwardMessage: bindActionCreators(ActionCreators.cancelForwardMessage, dispatch),
    updateCurrentUser: bindActionCreators(ActionCreators.updateCurrentUser, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
