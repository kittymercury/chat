import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PrivacyAndSecurityComponent from '../components/privacyAndSecurity';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return state.privacyAndSecurity;
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(PrivacyAndSecurityComponent);
