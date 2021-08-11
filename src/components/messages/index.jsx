import React from 'react';
import InputSearch from '../common/input-search';
import { formatDate } from '../helpers';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

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

  handleClickDeleteMessage = (message) => {
    const newMessages = this.props.app.state.messages.filter((m) => m.id !== message.id);
    this.props.app.setState({ messages: newMessages })
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

  handleClickButtonSend = () => {
    const { currentUser, messages } = this.props.app.state;
    const { inputMessage, messageToReply } = this.state;

    if (inputMessage && inputMessage.trim()) {
      const newMessage = {
        id: +new Date(),
        userId: currentUser.id,
        chatId: Number(this.props.params.chatId),
        time: +new Date(),
        content: inputMessage,
        reply: messageToReply,
      };
      const newMessages = messages.concat(newMessage);

      this.props.app.setState({ messages: newMessages })
      this.setState({
        inputMessage: '',
        messageToReply: null,
      });
    } else {
      this.props.app.setState({ messages });
    }
  }

  handleClickEditMessage = (message) => {
    this.setState({ messageToEdit: message, inputMessage: message.content });
  }

  handleClickButtonEditOk = () => {
    const { inputMessage, messageToEdit } = this.state;

    const newMessages = this.props.app.state.messages.map((m) => {
      if ((m.id === messageToEdit.id) && (messageToEdit.content !== inputMessage)) {
        return { ...m, content: inputMessage, edited: 'Edited' }
      } else {
        return m;
      }
    });

    this.props.app.setState({ messages: newMessages });
    this.setState({ inputMessage: '', messageToEdit: null });
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
    if (message.reply) {
      const user = users.find((u) => u.id === message.reply.userId);

      return (
        <div className="message-reply">
            <div className="reply-wrapper">
              <div className="to-user">Reply for: {user.name}</div>
              <div className="text-for-replying">{message.reply.content}</div>
            </div>
        </div>
      )
    }
  }

  renderMessageForward = (users, message) => {
    if (message.forward) {
      const user = users.find((u) => u.id === message.forward.userId);

      return (
        <div className="message-forward">
          <div className="forwarded-from">Forwarded from: {user.name}</div>
          <div className="forwarded-text">{message.forward.content}</div>
        </div>
      )
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
      const user = users.find((u) => u.id === message.userId);

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
          {(isMyMessage && !message.forward) && (
            <span onClick={() => this.handleClickEditMessage(message)}><i className="far fa-edit"></i></span>
          )}
        </div>
      )
    }
  }

  render () {
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
      messages.filter((message) => message.chatId === chatId).forEach((message) => {
        if (message.content && message.content.toLowerCase().includes(inputSearch.toLowerCase())) {
          foundMessages.push(message);
        }
      });
    } else {
      foundMessages = messages.filter((message) => message.chatId === chatId);
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
            const user = users.find((user) => user.id === message.userId);
            const isCurrentUsersMessage = message.userId === currentUser.id;

            const textALign = { textAlign: isCurrentUsersMessage ? 'right' : 'left' };
            const flexDirection = { flexDirection: isCurrentUsersMessage ? 'row-reverse' : 'row' };

            return (
              <li key={message.id} className="message-item" style={textALign} id={`m-${message.id}`}>

                {(message.userId === currentUser.id) && (
                  <div className="my-message" style={textALign, flexDirection}>
                    <div>
                      <span className="edited">{message.edited}</span>
                      <span className="message-data-my-name">{user.name}</span>
                      <span className="message-data-time">{formatDate(message.time)}</span>
                    </div>
                    {this.renderMessageReply(users, message)}
                    {this.renderMessageForward(users, message)}
                    <div className={className} dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
                  </div>
                )}

                {(message.userId !== currentUser.id) && (
                  <div className="other-message" style={textALign, flexDirection}>
                    <div>
                      {this.renderStatus(user)}
                      <span className="message-data-name">{user.name}</span>
                      <span className="message-data-time">{formatDate(message.time)}</span>
                      <span className="edited">{message.edited}</span>
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
