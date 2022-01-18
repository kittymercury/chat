import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/header';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    ...state.header,
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(ActionCreators.openPopup, dispatch),
    openSearch: bindActionCreators(ActionCreators.openSearch, dispatch),
    editProfile: bindActionCreators(ActionCreators.editProfile, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
