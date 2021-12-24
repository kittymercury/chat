import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PopupComponent from '../components/popup';
import * as ActionCreators from '../actions/popup/actionCreators';

const mapStateToProps = (state) => {
  return state.popup;
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
    closePopup: bindActionCreators(ActionCreators.closePopup, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(PopupComponent);
