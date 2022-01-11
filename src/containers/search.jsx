import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/common/search';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return state.search;
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSearchValue: bindActionCreators(ActionCreators.changeSearchValue, dispatch),
    closeSearch: bindActionCreators(ActionCreators.closeSearch, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
