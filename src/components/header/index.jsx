import React from 'react';
import { browserHistory } from 'react-router';

import { DELETED_USERNAME } from '../constants';
import './styles.scss';

export default class Header extends React.Component {
  handleClickEditMessages = (condition) => {
    this.props.app.setState({ isEditMessages: condition });
  }

  handleClickSearch = (condition) => {
    this.props.app.setState({ isSearch: condition });
  }

  handleCancelForwarding = () => {
    this.props.app.setState({ messageToForward: null });
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
      isEditMessages,
      messageToForward,
    } = this.props.app.state;

    const currentPage = this.props.app.getPage();

    return (
      <div>
        {(currentPage === 'chats')
          ? messageToForward
            ? <button onClick={this.handleCancelForwarding}>Cancel</button>
            :  <button onClick={() => browserHistory.push('/contacts')}><i className="fas fa-plus"></i></button>
          : ''}
        {[ 'registration', 'contact-info'].includes(currentPage) && (
          <button onClick={() => browserHistory.goBack()}>
            <i className="fas fa-long-arrow-alt-left"></i>
          </button>
        )}
        {(currentPage.includes('messages'))
          ? isEditMessages
            ? <button onClick={() => this.handleClickEditMessages(false)}>Cancel</button>
            : <button onClick={() => this.handleClickEditMessages(true)}>
                <i className="far fa-edit"></i>
              </button>
          : ''}
      </div>
    );
  }

  renderButtonsRight = () => {
    const { isSearch } = this.props.app.state;
    const currentPage = this.props.app.getPage();

    return (
      <div>
        {[ 'registration', 'settings', 'contact-info'].includes(currentPage) && (
          <button>
            <i className="fas fa-long-arrow-alt-left" style={{ display: 'none', cursor: 'initial' }}></i>
          </button>
        )}

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
        {(currentPage.includes('messages')) && (
           this.renderMessagesTitle()
        )}

        {Object.keys(titleByPathname).includes(currentPage) && (
          <div>{title}</div>
        )}
      </div>
    )
  }

  render () {
    return (
      <div className="header">
        {this.renderButtonsLeft()}
        {this.renderTitle()}
        {this.renderButtonsRight()}
      </div>
    )
  }
}
