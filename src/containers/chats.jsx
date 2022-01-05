import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChatComponent from '../components/chats';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return { chats: state.chats }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openChat: bindActionCreators(ActionCreators.openChat, dispatch),
    deleteChat: bindActionCreators(ActionCreators.deleteChat, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(ChatComponent);
