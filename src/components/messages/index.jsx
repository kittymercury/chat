import React from 'react';
import { browserHistory } from 'react-router';

import api from '../api';
import InputSearch from '../common/input-search';
import { formatDate } from '../helpers';
import './styles.scss';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
      inputMessage: '',
      messageToEdit: null,
      messageToReply: null
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const list = document.querySelector('.messages ul');
    list.style['scroll-behavior'] = 'smooth';
    this.setScroll(prevProps);
  }

  componentDidMount = () => {
    const list = document.querySelector('.messages ul');
    list.style['scroll-behavior'] = 'none';
    this.setScroll(this.props, true);
    const { foundMessage } = this.props.app.state;
    if (foundMessage) {
      const foundM = document.getElementById(`m-${foundMessage.id}`);
      foundM.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  setScroll = (props, force) => {
    if (force ? props.app.state.messages.length : (props.app.state.messages.length !== this.props.app.state.messages.length)) {
      const $messages = document.querySelector("#app > div > div.content.messages > ul");
      $messages.scrollTop = $messages.scrollHeight;
    }
  }

  scrollToMessage = (message) => {
    if (!message) return;
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

  changeInputValue = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  handleClickDeleteMessage = async (message) => {
    const data = await api('delete_message', message);
    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description,
      });
    } else if (data.deleted) {
      const newMessages = this.props.app.state.messages.filter((m) => m.id !== message.id);
      this.props.app.setState({ messages: newMessages })
    }
  }

  handleClickReply = (message) => {
    this.setState({ messageToReply: message })
  }

  handleClickForward = (message) => {
    this.props.app.setState({ messageToForward: message });
    browserHistory.push('/chats');
  }

  handlePressEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleClickButtonSend();
    }
  }

  handleClickButtonSend = async () => {
    const { currentUser, messages } = this.props.app.state;
    const { inputMessage, messageToReply } = this.state;

    if (inputMessage && inputMessage.trim()) {
      const newMessage = {
        user: currentUser.id,
        chat: Number(this.props.params.chatId),
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

  handleClickEditMessage = (message) => {
    this.setState({ messageToEdit: message, inputMessage: message.content });
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
      const newMessages = this.props.app.state.messages.map((m) => {
        if (m.id === data.message.id) {
          return data.message;
        } else {
          return m;
        }
      });

      this.props.app.setState({ messages: newMessages });
      this.setState({ inputMessage: '', messageToEdit: null });
    }
  }

  handleCancelReplying = () => {
    this.setState({ inputMessage: '', messageToReply: null });
  }

  renderStatus = (user) => {
    if (this.props.app.state.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status}`}></i>
    }
  }

  renderMessageReply = (users, message) => {
    if (message.reply_to) {
      const messageReplyTo = this.props.app.state.messages.find((m) => m.id === message.reply_to);

      if (messageReplyTo) {
        const user = this.props.app.state.currentUser.id === messageReplyTo.user
          ? this.props.app.state.currentUser
          : users.find((user) => user.id === messageReplyTo.user);
        return (
          <div className="message-reply" onClick={() => this.scrollToMessage(messageReplyTo)}>
              <div className="reply-wrapper">
                <div className="to-user">Reply for: {user.name}</div>
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
          : users.find((user) => user.id === forwardedMessage.user);
        return (
          <div className="message-forward" onClick={() => this.scrollToMessage(forwardedMessage)}>
            <div className="forwarded-from">Forwarded from: {user.name}</div>
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
          <i className="fas fa-reply"></i><br/>
          <span className="cancel-replying" onClick={this.handleCancelReplying}>x</span>
          <span>{user.name} </span><br/>
          <span className="message-to-reply-content">{message.content}</span>
        </div>
      )
    }
  }

  renderEditMessageFeatures = (condition, isMyMessage, message) => {
    if (condition) {
      return (
        <div className="edit-messages-features">
          <span onClick={() => this.handleClickReply(message)}><i className="fas fa-reply"></i> </span>
          <span onClick={() => this.handleClickForward(message)}> <i className="fas fa-share"></i></span>
          <span onClick={() => this.handleClickDeleteMessage(message)}><i className="fas fa-trash-alt"></i></span>
          {(isMyMessage && !message.forward_to) && (
            <span onClick={() => this.handleClickEditMessage(message)}><i className="far fa-edit"></i></span>
          )}
        </div>
      )
    }
  }

  render () {
    console.log(this.props.app.state.messages);

    const { inputSearch, inputMessage, messageToReply, messageToEdit } = this.state;
    const {
      users,
      currentUser,
      isEditMessages,
      isStatusVisible,
      isSearch,
      messages,
      foundMessage
    } = this.props.app.state;

    const chatId = Number(this.props.params.chatId);

    let foundMessages = [];
    if (isSearch && inputSearch) {
      messages.filter((message) => message.chat === chatId).forEach((message) => {
        if (message.content && message.content.toLowerCase().includes(inputSearch.toLowerCase())) {
          foundMessages.push(message);
        }
      });
    } else {
      foundMessages = messages.filter((message) => message.chat === chatId);
    }

    return (
      <div className="content messages">
        {isSearch && (
          <InputSearch
            value={inputSearch}
            onChange={(e) => this.changeInputValue('inputSearch', e)}
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
              : users.find((user) => user.id === message.user);
            const isCurrentUsersMessage = message.user === currentUser.id;

            const textALign = { textAlign: isCurrentUsersMessage ? 'right' : 'left' };
            const flexDirection = { flexDirection: isCurrentUsersMessage ? 'row-reverse' : 'row' };

            return (
              <li key={message.id} className="message-item" style={textALign} id={`m-${message.id}`}>

                {(message.user === currentUser.id) && (
                  <div className="my-message" style={textALign, flexDirection}>
                    <div>
                      <span className="edited">{message.updated_at ? 'Edited' : ''}</span>
                      <span className="message-data-my-name">{user.name}</span>
                      <span className="message-data-time">{formatDate(message.created_at)}</span>
                    </div>
                    {this.renderMessageReply(users, message)}
                    {this.renderMessageForward(users, message)}
                    <div className={className} dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
                  </div>
                )}

                {(message.user !== currentUser.id) && (
                  <div className="other-message" style={textALign, flexDirection}>
                    <div>
                      {this.renderStatus(user)}
                      <span className="message-data-name">{user.name}</span>
                      <span className="message-data-time">{formatDate(message.created_at)}</span>
                      <span className="edited">{message.updated_at ? 'Edited' : ''}</span>
                    </div>
                    {this.renderMessageReply(users, message)}
                    {this.renderMessageForward(users, message)}
                    <div className={className} dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
                  </div>
                )}

                {this.renderEditMessageFeatures(isEditMessages, isCurrentUsersMessage, message)}
              </li>
            )
          })}
        </ul>

        <div style={{ display: 'block' }}>
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
