import React from 'react';
import { browserHistory } from 'react-router';

import { getImg } from '../../helpers';
import { DELETED_USERNAME } from '../../constants';
import './styles.scss';

export default class Header extends React.Component {
  // componentDidMount = () => {
  //   const header = document.querySelector('.header');
  //   this.props.app.disableScroll(header);
  // }

  handleClickSearch = (condition) => {
    this.props.app.setState({ isSearch: condition });
  }

  handleCancelForwarding = () => {
    const { messageToForward, selectedMessages } = this.props.app.state;

    if (messageToForward) {
      this.props.app.setState({ messageToForward: null });
    }

    if (selectedMessages) {
      browserHistory.goBack();
    }
  }

  handleClickMsgMenu = () => {
    this.props.app.setState({
      isMsgMenuActive: this.props.app.state.isMsgMenuActive
        ? false
        : true
    });
  }

  handleClickAvatar = (id) => {
    const user = this.props.app.state.users.find((u) => u.id === id);
    if (user) {
      browserHistory.push(`/contact-info/${user.id}`);
    }
  }

  renderButtonsLeft = () => {
    const {
      messageToForward,
      isMsgMenuActive
    } = this.props.app.state;

    const currentPage = this.props.app.getPage();

    return (
      <div>
        {['chats', 'contacts'].includes(currentPage) && (
          <div className="navbar-item" onClick={() => this.handleClickSearch(true)}>
            <i className="fas fa-search"></i>
          </div>
        )}
        {currentPage === 'registration' && (
          <div className="btn-back navbar-item" onClick={() => browserHistory.goBack()}>
            <i className="fas fa-angle-left"></i>
          </div>
        )}
      </div>
    );
  }

  renderButtonsRight = () => {
    const { isSearch, messageToForward } = this.props.app.state;
    const currentPage = this.props.app.getPage();

    return (
      <div>
        {currentPage === 'registration' && (
          <button style={{ color: 'transparent', cursor: 'initial' }}>
            <i className="fas fa-angle-left"></i>
          </button>
        )}
      </div>
    );
  }

  renderMessagesHeader = () => {
    const currentPage = this.props.app.getPage();
    const { isSelectMode, isMsgMenuActive, currentUser, users = [], chats = [] } = this.props.app.state;
    if (isSelectMode) return;
    if (!chats) return;
    const currentChat = +window.location.pathname.split('/')[2];
    if (!currentChat) return;
    const chat = chats.find((c) => c.id === currentChat);
    if (!chat) return;
    const participant = chat.participants.find((id) => id !== currentUser.id);
    const user = users.find((u) => u.id === participant) || {};

    return (
      <div className="header-info-wrapper in-messages">
        <button className="msg-menu-button" onClick={() => this.props.app.setState({ isMsgMenuActive: isMsgMenuActive ? false : true })}>
          <i className="fas fa-ellipsis-v"></i>
        </button>
        <div className="title">
          <div className="user-data-header">
            <span>{user.name || DELETED_USERNAME}</span>
            <span className="status">{user.status}</span>
          </div>
        </div>
        <div className="user-avatar-small" style={{ backgroundImage: `url(${getImg(user.avatar)})` }} onClick={() => this.handleClickAvatar(user.id)}></div>
      </div>
    )
  }

  renderChatHeaderWithMessagesToForward = () => {
    const { isSelectMode, messageToForward, selectedMessages } = this.props.app.state;

    if (messageToForward || isSelectMode) {
      return (
        <div className="header-info-wrapper">
          <button style={{ color: 'transparent', cursor: 'initial' }} onClick={this.handleCancelForwarding}>Cancel</button>
          {messageToForward && (
            <div className="forwarded-messages-amount">Forward 1 message</div>
          )}
          {isSelectMode && (
            <div className="forwarded-messages-amount">Forward {selectedMessages.length} {selectedMessages.length > 1 ? 'messages' : 'message'}</div>
          )}
          <button onClick={this.handleCancelForwarding}>Cancel</button>
        </div>
      )
    }
  }

  renderTitle = () => {
    const currentPage = this.props.app.getPage();
    const titleByPathname = {
      'chats': 'Chats',
      'contacts': 'Contacts',
      'registration': 'Registration'
    }
    const title = titleByPathname[currentPage];

    return (
      <div className="navbar-item">
        {Object.keys(titleByPathname).includes(currentPage) && (
          <div className="title is-5">{title}</div>
        )}
      </div>
    )
  }

  renderHeader = () => {
    const { isSearch, isSelectMode, messageToForward } = this.props.app.state;
    const currentPage = this.props.app.getPage();
    if (currentPage === 'settings') return null;
    if (currentPage === 'authentication') return null;
    if (isSearch) return;
    if (messageToForward || isSelectMode && currentPage === 'chats') {
      return this.renderChatHeaderWithMessagesToForward()
    };

    if (!isSearch || !isSelectMode) {
      if (currentPage.includes('contact-info')) return null;

      if (currentPage.includes('messages')) {
        return this.renderMessagesHeader()
      } else {
        return (
          <div className="navbar is-fixed-top">
            <div className="navbar-brand">
              {this.renderButtonsLeft()}
              <div className="divider"></div>
              {this.renderTitle()}
            </div>
            {this.renderButtonsRight()}
          </div>
        )
      }
    }
  }

  render () {
    return this.renderHeader();
  }
}
