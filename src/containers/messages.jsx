import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/messages';
import * as CommonActionCreators from '../actions/actionCreators';
import * as MessagesActionCreators from '../actions/messages/actionCreators';
import * as RecordsActionCreators from '../actions/records/actionCreators';

const mapStateToProps = (state) => {
  return {
    page: state.pages.messages,
    records: state.records,
    currentUser: state.currentUser,
    location: state.location,
    foundMessage: state.foundMessage,
    search: state.search,
    settings: state.settings,
    typing: state.typing,
    popup: state.popup,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    getUserData: bindActionCreators(CommonActionCreators.getUserData, dispatch),
    changeInputValue: bindActionCreators(CommonActionCreators.changeInputValue, dispatch),
    clickMessage: bindActionCreators(MessagesActionCreators.clickMessage, dispatch),
    selectMessage: bindActionCreators(MessagesActionCreators.selectMessage, dispatch),
    reply: bindActionCreators(MessagesActionCreators.reply, dispatch),
    cancelReplying: bindActionCreators(MessagesActionCreators.cancelReplying, dispatch),
    forward: bindActionCreators(MessagesActionCreators.forward, dispatch),
    editMessage: bindActionCreators(MessagesActionCreators.editMessage, dispatch),
    updateRecords: bindActionCreators(RecordsActionCreators.updateRecords, dispatch),
    deleteRecords: bindActionCreators(RecordsActionCreators.deleteRecords, dispatch),
    createRecords: bindActionCreators(RecordsActionCreators.createRecords, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
