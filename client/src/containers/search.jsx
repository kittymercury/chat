import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/common/search';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    search: state.search,
    location: state.location,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSearchValue: bindActionCreators(ActionCreators.changeSearchValue, dispatch),
    closeSearch: bindActionCreators(ActionCreators.closeSearch, dispatch),
    searchUsers: bindActionCreators(ActionCreators.searchUsers, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
