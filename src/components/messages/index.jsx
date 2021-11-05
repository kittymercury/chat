import React from 'react';
import { browserHistory } from 'react-router';

import api from '../../api';
import InputSearch from '../common/input-search';
import { formatDate } from '../../helpers';
import { DELETED_USERNAME, CURRENT_TIMESTAMP } from '../../constants';
import './styles.scss';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
      inputMessage: '',
      messageWithFeatures: null,
      messageToEdit: null,
      messageToReply: null,
    };
  }

  componentDidMount = () => {
    const list = document.querySelector('.messages ul');
    list.style['scroll-behavior'] = 'none';
    this.props.app.setScroll();
    const { foundMessage } = this.props.app.state;
    if (foundMessage) {
      const foundM = document.getElementById(`m-${foundMessage.id}`);
      foundM.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  getChat = () => {
    return this.props.app.state.chats.find((c) => c.id === Number(this.props.params.chatId));
  }

  getParticipant = () => {
    const { chats, users, currentUser } = this.props.app.state;
    const chat = this.getChat();
    if (!chat) return;
    const participantId = chat.participants.find((id) => id !== currentUser.id);
    return users.find((user) => user.id === participantId);
  }

  scrollToMessage = (message) => {
    if (!message) return;
    const chatId = this.getChat().id;
    if (message.chat !== chatId) return;
    let element = document.getElementById(`m-${message.id}`);
    element.scrollIntoView({ block: "start", behavior: "smooth" });
    element = element.classList.add('marked');
  }

  tryHighlight = (content) => {
    let html = content;
    const { inputSearch } = this.state;
    const re = new RegExp(inputSearch, 'gi');

    if (inputSearch) {
      html = html.replace(re, `<span style="background-color: #ffff0038">${inputSearch}</span>`)
    }
    return { __html: html };
  }

  changeInputValue = async (name, e) => {
    this.setState({ [name]: e.target.value })

    clearTimeout(this.typingTimeout);
    await api('typing', { chat: this.getChat().id });
    this.typingTimeout = setTimeout(() => api('typing', {}), 5000)
  }

  handleClickMessage = async (id) => {
    const { messageWithFeatures } = this.state;
    const { isSelectMode, messages, selectedMessages } = this.props.app.state;

    if (!isSelectMode) {
      if (messageWithFeatures === id) {
        this.setState({ messageWithFeatures: null })
      }

      if (messageWithFeatures !== id || !messageWithFeatures) {
        this.setState({ messageWithFeatures: id });
      }
    }

    if (isSelectMode) {
      const msg = messages.find((m) => m.id === id);
      const $message = document.getElementById(`m-${id}`);
      const isSelected = selectedMessages.includes(msg.id);
      if (isSelected) {
        $message.classList.remove('selected');
        const filteredSelectedMessages = selectedMessages.filter((id) => id !== msg.id);
        this.props.app.setState({ selectedMessages: filteredSelectedMessages })
      }

      if (!isSelected) {
        $message.classList.add('selected');
        this.props.app.setState({ selectedMessages: selectedMessages.concat(msg.id) })
      }
    }
  }

  handleClickTurnOffSelectMode = () => {
    this.props.app.setState({
      isSelectMode: false,
      selectedMessages: []
    })
  }

  interactWithSelectedMessages = (action) => {
    const { selectedMessages } = this.props.app.state;
    if (action === 'delete') {
      this.props.app.handleOpenPopUp({
        message: `Do you want to delete ${selectedMessages.length} messages?`,
        onConfirm: () => this.handleConfirmDeleteSelectedMessages()
      })
    }

    if (action === 'forward') {
      browserHistory.push('/chats');
    }
  }

  handleConfirmDeleteSelectedMessages = async () => {
    const { messages, selectedMessages  } = this.props.app.state;

    for (let i = 0; i < selectedMessages.length; i++) {
      const message = messages.find((m) => m.id === selectedMessages[i]);
      const data = await api('delete_message', message);
      if (data.error) {
        this.props.app.handleOpenPopUp({
          message: data.error.description,
        });
      }

      if (data.deleted) {
        this.props.app.setState({ selectedMessages: [] })
        const newMessages = this.props.app.state.messages.filter((m) => m.id !== selectedMessages[i]);
        this.props.app.setState({
          messages: newMessages,
          isSelectMode: false
        })
      }
    }
  }

  renderEditMessageFeatures = () => {
    const { messages, currentUser } = this.props.app.state;
    const { messageWithFeatures } = this.state;

    if (messageWithFeatures) {
      const message = messages.find((m) => m.id === messageWithFeatures);
      const isMsgMine = message.user === currentUser.id;

      return (
        <div className="edit-messages-features">
          <span onClick={() => this.handleClickReply(message)}>Reply</span>
          <span onClick={() => this.handleClickForward(message)}>Forward</span>
          <span onClick={() => this.handleClickDeleteMessage(message)}>Delete</span>
          {(isMsgMine && !message.forward_to) && (
            <span onClick={() => this.handleClickEditMessage(message)}>Edit</span>
          )}
        </div>
      )
    }
  }

  handleClickDeleteMessage = (message) => {
    this.props.app.handleOpenPopUp({
      message: `Do you want to delete message?`,
      onConfirm: () => this.handleConfirmDeleteMessage(message)
    });
  }

  handleConfirmDeleteMessage = async (message) => {
    const data = await api('delete_message', message);
    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description,
      });
    }

    if (data.deleted) {
      this.setState({ messageWithFeatures: null })
      const newMessages = this.props.app.state.messages.filter((m) => m.id !== message.id);
      this.props.app.setState({ messages: newMessages })
    }
  }

  handleClickReply = (message) => {
    this.setState({
      messageToReply: message,
      messageWithFeatures: null
    })
  }

  handleClickForward = (message) => {
    this.props.app.setState({
      messageToForward: message,
      messageWithFeatures: null
    });
    browserHistory.push('/chats');
  }

  handleClickButtonSend = async () => {
    const { currentUser, messages } = this.props.app.state;
    const { inputMessage, messageToReply } = this.state;

    if (inputMessage && inputMessage.trim()) {
      const newMessage = {
        user: currentUser.id,
        chat: this.getChat().id,
        content: inputMessage
      };

      if (messageToReply) {
        newMessage.reply_to = messageToReply.id;
      }

      const data = await api('create_message', newMessage);

      if (data.error) {
        this.props.app.handleOpenPopUp({
          message: data.error.description,
        });
      } else {
        const newMessages = messages.concat(data.message);

        this.props.app.setState({ messages: newMessages })
        this.setState({
          inputMessage: '',
          messageToReply: null,
        });
      }
    }
  }

  handlePressEnter = (e) => {
    if (e.keyCode === 13) {
      if (this.state.messageToEdit) {
        this.handleClickButtonEditOk()
      } else {
        this.handleClickButtonSend();
      }
    }
  }

  handleClickEditMessage = (message) => {
    this.setState({
      messageToEdit: message,
      inputMessage: message.content,
      messageWithFeatures: null
    });
  }

  handleClickButtonEditOk = async () => {
    const { inputMessage, messageToEdit } = this.state;

    if (messageToEdit.content === inputMessage) return;

    const data = await api('update_message', {
      id: messageToEdit.id,
      content: inputMessage
    });

    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description,
      });
    }

    if (data.message) {
      this.props.app.updateMessages(data.message);
      this.setState({ inputMessage: '', messageToEdit: null });
    }
  }

  handleCancelReplying = () => {
    this.setState({ inputMessage: '', messageToReply: null });
  }

  renderStatus = (user = {}) => {
    if (this.props.app.state.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status || 'offline'}`}></i>
    }
  }

  renderMessageReply = (users, message) => {
    if (message.reply_to) {
      const messageReplyTo = this.props.app.state.messages.find((m) => m.id === message.reply_to);

      if (messageReplyTo) {
        const user = this.props.app.state.currentUser.id === messageReplyTo.user
          ? this.props.app.state.currentUser
          : users.find((user) => user.id === messageReplyTo.user) || {};
        return (
          <div className="message-reply" onDoubleClick={() => this.scrollToMessage(messageReplyTo)}>
              <div className="reply-wrapper">
                <div className="to-user">
                  <span style={{ color: '#dbdbdb' }}>Reply to </span>
                  <span>{user.name || DELETED_USERNAME}</span>
                </div>
                <div className="text-for-replying">{messageReplyTo.content}</div>
              </div>
          </div>
        )
      } else {
        return (
          <div className="message-reply">
              <div className="reply-wrapper">
                <div className="text-for-replying deleted">Message was deleted</div>
              </div>
          </div>
        )
      }
    }
  }

  renderMessageForward = (users, message) => {
    if (message.forward_to) {
      const forwardedMessage = this.props.app.state.messages.find((m) => m.id === message.forward_to);

      if (forwardedMessage) {
        const user = this.props.app.state.currentUser.id === forwardedMessage.user
          ? this.props.app.state.currentUser
          : users.find((user) => user.id === forwardedMessage.user) || {};
        return (
          <div className="message-forward" onDoubleClick={() => this.scrollToMessage(forwardedMessage)}>
            <div className="forwarded-from">Forwarded from: {user.name || DELETED_USERNAME}</div>
            <div className="forwarded-text">{forwardedMessage.content}</div>
          </div>
        )
      } else {
        return (
          <div className="message-forward">
            <div className="forwarded-from deleted">Forwarded message was deleted</div>
          </div>
        )
      }
    }
  }

  renderInputButton = (condition) => {
    if (condition) {
      return (
        <div className="input-button" onClick={this.handleClickButtonEditOk}>
          <i className="fas fa-check"></i>
        </div>
      )
    } else {
      return (
        <div className="input-button" onClick={this.handleClickButtonSend}>
          <i className="far fa-paper-plane"></i>
        </div>
      )
    }
  }

  renderInputMessageToReply = (users, message) => {
    if (message) {
      const user = this.props.app.state.currentUser.id === message.user
        ? this.props.app.state.currentUser
        : users.find((user) => user.id === message.user);

      return (
        <div className="reply-to">
          <div className="cancel-wrapper">
            <i className="fas fa-reply"></i>
            <span className="cancel-replying" onClick={this.handleCancelReplying}>Cancel</span>
          </div>
          <span>{user.name} </span><br/>
          <span className="message-to-reply-content">{message.content}</span>
        </div>
      )
    }
  }

  renderSeenCheck = (condition) => {
    if (condition) {
      return (
        <span className="seen">
          <i className="fas fa-check"></i>
        </span>
      )
    }
  }

  renderUserTyping = () => {
    const { typing } = this.props.app.state;

    const participant = this.getParticipant();
    if (!participant) return;

    const chat = this.getChat();
    if (!chat) return;

    if ((participant.id === typing.user) && (chat.id === typing.chat)) {
      return (
        <div className="user-is-typing">
          <i className="fas fa-pen-fancy"></i>
          <span>{participant.name} is typing...</span>
        </div>
      )
    }
  }

  renderMessagesMenu = () => {
    const { isMsgMenuActive } = this.props.app.state;
    return (
      <div className={`submenu-messages ${isMsgMenuActive ? 'active' : ''}`}>
        <div className="submenu-messages-item" onClick={() => this.props.app.setState({ isSearch: true, isMsgMenuActive: false })}>
          <i className="fas fa-search"></i>
          <span>Search</span>
        </div>
        <div className="submenu-messages-item" onClick={() => this.props.app.setState({ isSelectMode: true, isMsgMenuActive: false })}>
          <i className="fas fa-check-circle"></i>
          <span>Select messages</span>
        </div>
        <div className="submenu-messages-item">item</div>
      </div>
    )
  }

  renderSelectModeHeader = () => {
    const { isSelectMode } = this.props.app.state;

    if (!isSelectMode) return;
    if (isSelectMode) {
      return (
        <div className="header-info-wrapper btns">
          <div className="cancel-select-msgs" onClick={() => this.handleClickTurnOffSelectMode()}>Cancel</div>
          <div className="frwrd" onClick={() => this.interactWithSelectedMessages('forward')}>Forward</div>
          <div className="dlt" onClick={() => this.interactWithSelectedMessages('delete')}>Delete</div>
        </div>
      )
    }
  }

  render () {
    const { inputSearch, inputMessage, messageToReply, messageToEdit, messageWithFeatures } = this.state;
    const {
      chats,
      users,
      currentUser,
      isMsgMenuActive,
      isStatusVisible,
      isSearch,
      messages,
      foundMessage,
      selectedMessages,
      isSelectMode
    } = this.props.app.state;
    const chat = this.getChat() || {};

    let foundMessages = [];
    if (isSearch && inputSearch) {
      messages.filter((message) => message.chat === chat.id).forEach((message) => {
        if (message.content && message.content.toLowerCase().includes(inputSearch.toLowerCase())) {
          foundMessages.push(message);
        }
      });
    } else {
      foundMessages = messages.filter((message) => message.chat === chat.id);
    }

    return (
      <div className="content messages">
        {this.renderMessagesMenu()}
        {this.renderSelectModeHeader()}
        {isSearch && (
          <InputSearch
            value={inputSearch}
            onChange={(e) => this.changeInputValue('inputSearch', e)}
            onCancel={() => this.props.app.setState({ isSearch: false })}
          />
        )}

        <ul>
          {foundMessages.map((message) => {
            let className = "message-data-content";
            if (foundMessage && (message.id === foundMessage.id)) {
              className = "message-data-content highlight";
            };

            const user = currentUser.id === message.user
              ? currentUser
              : users.find((user) => user.id === message.user) || {};
            const isCurrentUsersMessage = message.user === currentUser.id;

            const textALign = { textAlign: isCurrentUsersMessage ? 'right' : 'left' };
            const flexDirection = { flexDirection: isCurrentUsersMessage ? 'row-reverse' : 'row' };

            return (
              <li key={message.id} className="message-item" style={textALign} id={`m-${message.id}`}>
                {isSelectMode && (message.user === currentUser.id) && (
                  <div className="select">
                    <i className="far fa-circle"></i>
                    <i className="fas fa-circle"></i>
                  </div>
                  )}

                {(message.user === currentUser.id) && (
                  <div className="my-message" style={textALign, flexDirection} onClick={() => this.handleClickMessage(message.id)}>
                    {this.renderMessageReply(users, message)}
                    {this.renderMessageForward(users, message)}
                    <div className="message-data">
                      <div className={className} dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
                      <div className="data-wrapper">
                        <span className="edited">{message.updated_at ? 'Edited' : ''}</span>
                        <span className="message-data-time">{formatDate(message.created_at)}</span>
                        {this.renderSeenCheck(true)}
                      </div>
                    </div>
                  </div>
                )}

                {(message.user !== currentUser.id) && (
                  <div className="other-message" style={textALign, flexDirection} onClick={() => this.handleClickMessage(message.id)}>
                    {this.renderMessageReply(users, message)}
                    {this.renderMessageForward(users, message)}
                    <div className="message-data">
                      <div className={className} dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
                      <div className="data-wrapper">
                        <span className="message-data-time">{formatDate(message.created_at)}</span>
                        <span className="edited">{message.updated_at ? 'Edited' : ''}</span>
                      </div>
                    </div>
                  </div>
                )}
                {isSelectMode && (message.user !== currentUser.id) && (
                  <div className="select">
                    <i className="far fa-circle"></i>
                    <i className="fas fa-circle"></i>
                  </div>
                  )}

                {(message.id === messageWithFeatures) &&
                this.renderEditMessageFeatures()}
              </li>
            )
          })}
        </ul>

        <div style={{ display: 'block' }}>
          {this.renderUserTyping()}
          {this.renderInputMessageToReply(users, messageToReply)}

          <div className="input-wrapper" style={{ display: 'flex' }}>
            <input
              className="input-messages"
              autoComplete="off"
              style={{ flex: 1 }}
              placeholder="Type your message here"
              autoFocus
              value={inputMessage}
              onKeyUp={this.handlePressEnter}
              onChange={(e) => this.changeInputValue('inputMessage', e)}
            />

            {this.renderInputButton(messageToEdit)}
          </div>
        </div>
      </div>
    )
  }
}
