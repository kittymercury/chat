import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/messages';
import * as CommonActionCreators from '../actions/actionCreators';
import * as MessagesActionCreators from '../actions/messages/actionCreators';
import * as RecordsActionCreators from '../actions/records/actionCreators';

const mapStateToProps = (state) => {
  return {
    messagesPage: state.pages.messages,
    records: state.records,
    currentUser: state.currentUser,
    location: state.location,
    foundMessage: state.foundMessage,
    search: state.search,
    selectedMessages: state.selectedMessages,
    isStatusVisible: state.isStatusVisible,
    isSelectMode: state.isSelectMode,
    typing: state.typing,
    theme: state.theme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    changeInputValue: bindActionCreators(CommonActionCreators.changeInputValue, dispatch),
    clickMessage: bindActionCreators(MessagesActionCreators.clickMessage, dispatch),
    reply: bindActionCreators(MessagesActionCreators.reply, dispatch),
    cancelReplying: bindActionCreators(MessagesActionCreators.cancelReplying, dispatch),
    forward: bindActionCreators(MessagesActionCreators.forward, dispatch),
    editMessage: bindActionCreators(MessagesActionCreators.editMessage, dispatch),
    updateRecords: bindActionCreators(RecordsActionCreators.updateRecords, dispatch),
    deleteRecords: bindActionCreators(RecordsActionCreators.deleteRecords, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
