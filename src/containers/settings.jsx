import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/settings';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return state.pages.settings;
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
    toggleEditMode: bindActionCreators(ActionCreators.toggleEditMode, dispatch),
    toggleSettingsNavActivity: bindActionCreators(ActionCreators.toggleSettingsNavActivity, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
