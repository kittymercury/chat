import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/dropdownSettings';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    header: state.header,
    theme: state.theme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: bindActionCreators(ActionCreators.editProfile, dispatch),
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
