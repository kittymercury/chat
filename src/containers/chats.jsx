import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/chats';
import * as CommonActionCreators from '../actions/actionCreators';
import * as RecordsActionCreators from '../actions/records/actionCreators';
import * as MessagesActionCreators from '../actions/messages/actionCreators';

const mapStateToProps = (state) => {
  return {
    records: state.records,
    currentUser: state.currentUser,
    search: state.search,
    settings: state.settings,
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
