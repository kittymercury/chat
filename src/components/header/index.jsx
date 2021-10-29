import React from 'react';
import { browserHistory } from 'react-router';

import { DELETED_USERNAME } from '../../constants';
import './styles.scss';

export default class Header extends React.Component {
  handleClickEditMessages = (condition) => {
    this.props.app.setState({ isMsgMenuActive: condition });
  }

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

  renderSearchButton = (condition) => {
    if (condition) {
      return (
        <button onClick={() => this.handleClickSearch(false)}>Cancel</button>
      )
    } else {
      return (
        <button onClick={() => this.handleClickSearch(true)}>
          <i className="fas fa-search"></i>
        </button>
      )
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
        {(currentPage === 'chats')
          ? messageToForward
            ? <button onClick={this.handleCancelForwarding}>Cancel</button>
            : <button onClick={() => browserHistory.push('/contacts')}>
              <i className="fas fa-plus"></i>
            </button>
          : ''}
        {(currentPage.includes('contact-info') || currentPage === 'registration') && (
          <button onClick={() => browserHistory.goBack()}>
            <i className="fas fa-long-arrow-alt-left"></i>
          </button>
        )}
          {currentPage.includes('messages') && (
            <button className="msg-menu-button" onClick={() => this.handleClickMsgMenu()}>
              <i className="fas fa-ellipsis-v"></i>
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
        {(['chats', 'contacts'].includes(currentPage) || currentPage.includes('messages')) && this.renderSearchButton(isSearch)}
      </div>
    );
  }

  renderMessagesTitle = () => {
    const { currentUser, users = [], chats = [] } = this.props.app.state;
    if (!chats) return;
    const currentChat = +window.location.pathname.split('/')[2];
    if (!currentChat) return;
    const chat = chats.find((c) => c.id === currentChat);
    if (!chat) return;
    const participant = chat.participants.find((id) => id !== currentUser.id);
    const user = users.find((u) => u.id === participant) || {};

    return <div>{user.name || DELETED_USERNAME}</div>
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
        {currentPage.includes('messages') && this.renderMessagesTitle()}

        {Object.keys(titleByPathname).includes(currentPage) && (
          <div >{title}</div>
        )}
      </div>
    )
  }

  render () {
    console.log({active: this.props.app.state.isMsgMenuActive});
    const { isSearch } = this.props.app.state;

    return (
      <div className="header">
        {isSearch
          ? ''
          : (
            <div className="header-info-wrapper">
              {this.renderButtonsLeft()}
              {this.renderTitle()}
              {this.renderButtonsRight()}
            </div>
          )}
      </div>
    )
  }
}
