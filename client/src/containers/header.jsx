import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/header';
import * as CommonActionCreators from '../actions/actionCreators';
import * as MessagesActionCreators from '../actions/messages/actionCreators';

const mapStateToProps = (state) => {
  return {
    header: state.header,
    location: state.location,
    profile: state.pages.profile,
    currentUser: state.currentUser,
    settings: state.settings,
    records: state.records
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    openSearch: bindActionCreators(CommonActionCreators.openSearch, dispatch),
    editProfile: bindActionCreators(CommonActionCreators.editProfile, dispatch),
    cancelForwardMessage: bindActionCreators(CommonActionCreators.cancelForwardMessage, dispatch),
    updateCurrentUser: bindActionCreators(CommonActionCreators.updateCurrentUser, dispatch),
    getUserData: bindActionCreators(CommonActionCreators.getUserData, dispatch),
    turnOffSelectMode: bindActionCreators(MessagesActionCreators.turnOffSelectMode, dispatch),
    forward: bindActionCreators(MessagesActionCreators.forward, dispatch),
    cancelForward: bindActionCreators(MessagesActionCreators.cancelForward, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
