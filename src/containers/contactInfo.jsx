import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/contactInfo';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return state.pages.contactInfo;
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
