import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/footer';
import * as CommonActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    messages: state.records.messages,
    currentUser: state.currentUser,
    location: state.location,
    theme: state.theme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
