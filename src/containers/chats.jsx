import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChatComponent from '../components/chats';
import * as ActionCreators from '../actions/chats/actionCreators';

const mapStateToProps = (state) => {
  console.log({containerch: state});
  return {
    chats: state.chats,
    search: state.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // changeSearchValue: bindActionCreators(ActionCreators.changeSearchValue, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(ChatComponent);
