import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/contacts';
import * as RecordsActionCreators from '../actions/records/actionCreators';
import * as CommonActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    records: state.records,
    currentUser: state.currentUser,
    search: state.search,
    isStatusVisible: state.settings.isStatusVisible,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    closeSearch: bindActionCreators(CommonActionCreators.closeSearch, dispatch),
    createRecords: bindActionCreators(RecordsActionCreators.createRecords, dispatch),
    updateRecords: bindActionCreators(RecordsActionCreators.updateRecords, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
