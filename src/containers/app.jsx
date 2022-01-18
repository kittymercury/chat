import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../App';
import * as CommonActionCreators from '../actions/actionCreators';
import * as RecordsActionCreators from '../actions/records/actionCreators';

const mapStateToProps = (state) => {
  return { state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: bindActionCreators(CommonActionCreators.init, dispatch),
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    updateCurrentUser: bindActionCreators(CommonActionCreators.updateCurrentUser, dispatch),
    updateRecords: bindActionCreators(RecordsActionCreators.updateRecords, dispatch),
    deleteRecords: bindActionCreators(RecordsActionCreators.deleteRecords, dispatch),
    createRecords: bindActionCreators(RecordsActionCreators.createRecords, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
