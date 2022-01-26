import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/popup';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    popup: state.popup,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
    closePopup: bindActionCreators(ActionCreators.closePopup, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
