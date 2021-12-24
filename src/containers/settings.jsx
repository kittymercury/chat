import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SettingsComponent from '../components/settings';
import * as ActionCreators from '../actions/popup/actionCreators';

const mapStateToProps = (state) => {
  return state.settings;
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(SettingsComponent);
