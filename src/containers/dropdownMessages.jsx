import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/dropdownMessages';
import * as CommonActionCreators from '../actions/actionCreators';
import * as MessagesActionCreators from '../actions/messages/actionCreators';
import * as RecordsActionCreators from '../actions/records/actionCreators';

const mapStateToProps = (state) => {
  return {
    header: state.header,
    location: state.location,
    settings: state.settings,
    records: state.records,
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    openSearch: bindActionCreators(CommonActionCreators.openSearch, dispatch),
    getUserData: bindActionCreators(CommonActionCreators.getUserData, dispatch),
    turnOnSelectMode: bindActionCreators(MessagesActionCreators.turnOnSelectMode, dispatch),
    deleteRecords: bindActionCreators(RecordsActionCreators.deleteRecords, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
