import React from 'react';
import { browserHistory } from 'react-router';

import './styles/base.scss';
import './styles/aqua.css';
import './styles/purple.css';

export default class Header extends React.Component {
  handleClickSignOut = () => {
    this.props.app.handleOpenPopUp({
      message: 'Do you want to sign out?',
      onConfirm: this.handleClickConfirmSignOut,
      onClose: this.props.app.handleClosePopUp
    });
  }

  handleClickConfirmSignOut = () => {
    this.setState({ currentUser: null });
    localStorage.removeItem('user');
    browserHistory.push('/authentication');
  }

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

    const [ currentPage ] = window.location.pathname.slice(1).split('/');

    return (
      <div>
        {(currentPage === 'chats')
          ? messageToForward
            ? <button onClick={this.handleCancelForwarding}>Cancel</button>
            :  <button onClick={() => browserHistory.push('/contacts')}><i className="fas fa-plus"></i></button>
          : ''}
        {[ 'registration', 'privacy-and-security', 'themes', 'profile', 'contact-info'].includes(currentPage) && (
          <button onClick={() => browserHistory.goBack()}>
            <i className="fas fa-long-arrow-alt-left"></i>
          </button>
        )}
        {(currentPage === 'messages')
          ? isEditMessages
            ? <button onClick={() => this.handleClickEditMessages(false)}>Cancel</button>
            : <button onClick={() => this.handleClickEditMessages(true)}>
                <i className="far fa-edit"></i>
              </button>
          : ''}
        {(currentPage === 'settings') && (
          <button className="sign-out" style={{ opacity: '0', cursor: 'alias' }}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        )}
      </div>
    );
  }

  renderButtonsRight = () => {
    const { isSearch } = this.props.app.state;
    const [ currentPage ] = window.location.pathname.slice(1).split('/');

    return (
      <div>
        {[ 'registration', 'privacy-and-security', 'themes', 'profile', 'contact-info'].includes(currentPage) && (
          <button>
            <i className="fas fa-long-arrow-alt-left" style={{ display: 'none', cursor: 'initial' }}></i>
          </button>
        )}

        {['chats', 'messages'].includes(currentPage) && this.renderSearchButton(isSearch)}

        {(currentPage === 'settings') && (
          <button className="sign-out" onClick={this.props.app.handleClickSignOut}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        )}
      </div>
    );
  }

  renderMessagesTitle = () => {
    const { currentUser, users, chats } = this.props.app.state;
    const currentChat = Number(this.props.params.chatId);
    if (!currentChat) return;

    const chat = chats.find((c) => c.id === currentChat);
    const participant = chat.participants.find((id) => id !== currentUser.id);
    const title = users.find((user) => user.id === participant).name;

    return (
      <div>{title}</div>
    )
  }

  renderTitle = () => {
    const [ currentPage ] = window.location.pathname.slice(1).split('/');
    const titleByPathname = {
      'chats': 'Chats',
      'settings': 'Settings',
      'contacts': 'Contacts',
      'privacy-and-security': 'Privacy and security',
      'themes': 'Themes',
      'profile': 'Profile',
    }
    const title = titleByPathname[currentPage];

    return (
      <div className="title">
        {(currentPage === 'messages') && (
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
