import React from 'react';
import { browserHistory } from 'react-router';

import { getImg } from '../../helpers';
import { DELETED_USERNAME } from '../../constants';
import './styles.scss';

export default class Header extends React.Component {
  handleClickSearch = (condition) => {
    this.props.app.setState({ isSearch: condition });
  }

  handleCancelForwarding = () => {
    this.props.app.setState({ messageToForward: null });
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

  renderSearchButton = () => {
    return (
      <button onClick={() => this.handleClickSearch(true)}>
        <i className="fas fa-search"></i>
      </button>
    )
  }

  renderButtonsLeft = () => {
    const {
      messageToForward,
      isMsgMenuActive
    } = this.props.app.state;

    const currentPage = this.props.app.getPage();

    return (
      <div>
        {(currentPage === 'chats')
          ? messageToForward
            ? <button onClick={this.handleCancelForwarding}>Cancel</button>
            : <button onClick={() => browserHistory.push('/contacts')}>
              <i className="fas fa-plus"></i>
            </button>
          : ''}
        {currentPage === 'registration' && (
          <button onClick={() => browserHistory.goBack()}>
            <i className="fas fa-long-arrow-alt-left"></i>
          </button>
        )}
          {currentPage === 'contacts'
            ? this.props.app.state.isSearch
              ? (
                <button style={{ color: 'transparent', cursor: 'initial' }}>Cancel</button>
              )
              : (
                <button>
                  <i style={{ color: 'transparent', cursor: 'initial' }} className="fas fa-search"></i>
                </button>
              )
            : ''}
      </div>
    );
  }

  renderButtonsRight = () => {
    const { isSearch } = this.props.app.state;
    const currentPage = this.props.app.getPage();

    return (
      <div>
        {['chats', 'contacts'].includes(currentPage) && this.renderSearchButton()}
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

  renderTitle = () => {
    const currentPage = this.props.app.getPage();
    const titleByPathname = {
      'chats': 'Chats',
      'settings': 'Settings',
      'contacts': 'Contacts',
    }
    const title = titleByPathname[currentPage];

    return (
      <div className="title">
        {Object.keys(titleByPathname).includes(currentPage) && (
          <div >{title}</div>
        )}
      </div>
    )
  }

  renderHeader = (condition) => {
    if (condition) return;
    if (!condition) {
      const currentPage = this.props.app.getPage();
      if (currentPage.includes('contact-info')) return;

      if (currentPage.includes('messages')) {
        return this.renderMessagesHeader()
      } else {
        return (
          <div className="header-info-wrapper">
            {this.renderButtonsLeft()}
            {this.renderTitle()}
            {this.renderButtonsRight()}
          </div>
        )
      }
    }
  }

  render () {
    return (
      <div className="header">
        {this.renderHeader(this.props.app.state.isSearch)}
      </div>
    )
  }
}
