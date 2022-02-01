import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/contactInfo';
import * as CommonActionCreators from '../actions/actionCreators';
import * as RecordsActionCreators from '../actions/records/actionCreators';

const mapStateToProps = (state) => {
  return {
    user: state.pages.contactInfo.user,
    records: state.records,
    currentUser: state.currentUser,
    location: state.location,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    updateCurrentUser: bindActionCreators(CommonActionCreators.updateCurrentUser, dispatch),
    getUserData: bindActionCreators(CommonActionCreators.getUserData, dispatch),
    createRecords: bindActionCreators(RecordsActionCreators.createRecords, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
