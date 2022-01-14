import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from '../components/messages';
import * as CommonActionCreators from '../actions/actionCreators';
import * as MessagesActionCreators from '../actions/messages/actionCreators';

const mapStateToProps = (state) => {
  return state.pages.messages;
}

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: bindActionCreators(CommonActionCreators.openPopup, dispatch),
    onMessage: bindActionCreators(MessagesActionCreators.onMessage, dispatch),
    reply: bindActionCreators(MessagesActionCreators.reply, dispatch),
    cancelReplying: bindActionCreators(MessagesActionCreators.cancelReplying, dispatch),
    forward: bindActionCreators(MessagesActionCreators.forward, dispatch),
    editMessage: bindActionCreators(MessagesActionCreators.editMessage, dispatch),
    changeInputMessages: bindActionCreators(MessagesActionCreators.changeInputMessages, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Component);
