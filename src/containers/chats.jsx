import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/chats';
import * as CommonActionCreators from '../actions/actionCreators';
import * as RecordsActionCreators from '../actions/records/actionCreators';

const mapStateToProps = (state) => {
  return {
    records: state.records,
    currentUser: state.currentUser,
    search: state.search,
    theme: state.theme,
    isStatusVisible: state.isStatusVisible,
    selectedMessages: state.selectedMessages,
    messageToForward: state.messageToForward,
    isSelectMode: state.isSelectMode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    updateRecords: bindActionCreators(RecordsActionCreators.updateRecords, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
