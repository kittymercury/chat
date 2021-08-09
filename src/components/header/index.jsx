import React from 'react';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

export default class Header extends React.Component {

  renderSearchButton = (condition) => {
    const { onClickSearch } = this.props;

    if (condition) {
      return (
        <button onClick={() => onClickSearch(false)}>Cancel</button>
      )
    } else {
      return (
        <button onClick={() => onClickSearch(true)}>
          <i className="fas fa-search"></i>
        </button>
      )
    }
  }

  renderButtonsLeft = () => {
    const {
      currentPage,
      isEditMessages,
      onClickCreateChat,
      onClickEditMessages,
      onClickButtonBack,
      messageToForward,
      onClickCancelForwarding
    } = this.props;

    return (
      <div>
        {(currentPage === 'Chats')
          ? messageToForward
            ? <button onClick={onClickCancelForwarding}>Cancel</button>
            :  <button onClick={onClickCreateChat}><i className="fas fa-plus"></i></button>
          : ''}
        {[ 'Registration', 'Privacy and security', 'Themes', 'Edit profile', 'Contact info'].includes(currentPage) && (
          <button onClick={onClickButtonBack}>
            <i className="fas fa-long-arrow-alt-left"></i>
          </button>
        )}
        {(currentPage === 'Messages')
          ? isEditMessages
            ? <button onClick={() => onClickEditMessages(false)}>Cancel</button>
            : <button onClick={() => onClickEditMessages(true)}>
                <i className="far fa-edit"></i>
              </button>
          : ''}
        {(currentPage === 'Settings') && (
          <div className="sign-out">
            <i className="fas fa-sign-out-alt" style={{ opacity: '0' }}></i>
          </div>
        )}
      </div>
    );
  }

  renderButtonsRight = () => {
    const { currentPage, isSearch, onClickSignOut } = this.props;

    return (
      <div>
        {[ 'Registration', 'Privacy and security', 'Themes', 'Edit profile', 'Contact info'].includes(currentPage) && (
          <button>
            <i className="fas fa-long-arrow-alt-left" style={{ display: 'none', cursor: 'initial' }}></i>
          </button>
        )}

        {['Chats', 'Messages'].includes(currentPage) && this.renderSearchButton(isSearch)}

        {(currentPage === 'Settings') && (
          <div className="sign-out" onClick={onClickSignOut}>
            <i className="display fas fa-sign-out-alt"></i>
          </div>
        )}
      </div>
    );
  }

  renderMessagesTitle = () => {
    const { currentUser, currentChat, users, chats } = this.props;
    if (!currentChat) return;

    const chat = chats.find((c) => c.id === currentChat.id);
    const participant = chat.participants.find((id) => id !== currentUser);
    const title = users.find((user) => user.id === participant).name;

    return (
      <div>{title}</div>
    )
  }

  renderTitle = () => {
    const { currentPage } = this.props;

    return (
      <div className="title">
        {(currentPage === 'Messages') && (
           this.renderMessagesTitle()
        )}

        {['Chats', 'Settings', 'Contacts', 'Privacy and security', 'Themes', 'Edit profile' ].includes(currentPage) && (
          <div>{currentPage}</div>
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
