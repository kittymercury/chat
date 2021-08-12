import React from 'react';
import lodash from 'lodash';

import InputSearch from '../common/input-search';
import { getImg, formatDate } from '../helpers';

import './styles.scss';

export default class Chats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
    }
  }

  handleClickFoundMessage = (message) => {
    const { chats } = this.props.app.state;
    const chat = chats.find((chat) => chat.id === message.chatId);
    this.props.app.setState({ foundMessage: message });
    browserHistory.push(`/messages/${chat.id}`);
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

  handleChangeInputSearch = (e) => {
    this.setState({ inputSearch: e.target.value });
  }

  handleClickChat = (chat) => {
    const { messageToForward, messages, isEditMessages } = this.props.app.state;

    if (messageToForward) {
      const message = {
        id: +new Date(),
        userId: this.props.app.state.currentUser.id,
        chatId: chat.id,
        time: +new Date(),
        forward: messageToForward
      };
      const newMessages = messages.concat(message);
      this.props.app.setState({ messages: newMessages, messageToForward: null, isEditMessages: false });
    }

    browserHistory.push(`/messages/${chat.id}`);
  }

  handleClickDeleteChat = (chat) => {
    const { chats } = this.props.app.state;
    const filteredChats = chats.filter((c) => c !== chat);

    this.props.app.setState({ chats: filteredChats });
  }

  renderMessagePreview = (message) => {
    if (message) {
      if (message.forward) {
        return <div>Forwarded message</div>
      }
      if (message.content) {
        return <div>{message.content}</div>
      }
    }
  }

  renderStatus = (user) => {
    if (this.props.app.state.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status}`}></i>
    }
  }

  renderChat = (chat, user, message) => {
    const onClick = () => this.props.onClick(chat);
    const onDelete = () => this.props.onDelete(chat);

    return (
      <li key={chat.id} onClick={onClick}>
        <div className="chat-img-wrapper">
          {this.renderStatus(user)}
          <img className="chat-image" src={getImg(user.avatar)} />
        </div>
        <div className="text-wrapper">
          <div className="name">{user.name}</div>
          <span className="message-time">{message ? formatDate(message.time) : ''}</span>
          <div className="message-preview">
            {this.renderMessagePreview(message)}
          </div>
        </div>
        <div className="delete" onClick={onDelete}>
          <i className="fas fa-trash-alt"></i>
        </div>
      </li>
    )
  }

  renderMessage = (message, user) => {
    return (
      <li key={message.id} onClick={() => this.handleClickFoundMessage(message)}>
        <div className="chat-img-wrapper">
          <img className="chat-image" src={getImg(user.avatar)} />
        </div>
        <div className="text-wrapper">
          <div className="name">{user.name}</div>
          <span className="message-time">{formatDate(message.time)}</span>
          <div className="message-preview">
            <div dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
          </div>
        </div>
      </li>
    )
  }

  render () {
    const { inputSearch } = this.state;
    const {
      chats,
      users,
      currentUser,
      isSearch,
      isStatusVisible,
      messages
    } = this.props.app.state;

    const currentUsersChats = chats.filter((chat) => {
      return chat.participants.includes(currentUser);
    });

    let foundChats = [];
    if (isSearch && inputSearch) {
      currentUsersChats.forEach((chat) => {
        const participant = users.find((user) => user.id === chat.participants.find((id) => id !== currentUser.id));
        if (participant.name.toLowerCase().includes(inputSearch.toLowerCase())) {
          foundChats.push(chat);
        }
      });
    } else {
      foundChats = currentUsersChats;
    }

    const currentUsersChatMessages = currentUsersChats.map((chat) => {
      return messages.filter((m) => m.chatId === chat.id);
    })

    let foundMessages = [];

    if (isSearch && inputSearch) {
      currentUsersChatMessages.forEach((m) => {
        m.forEach((message) => {
          if (message.content && message.content.toLowerCase().includes(inputSearch.toLowerCase())) {
            foundMessages.push(message);
          }
        })
      });
    }

    const sortedChats = foundChats.sort((a, b) => {
      const chatMessagesA = messages.filter((message) => message.chatId === a.id);
      const chatMessagesB = messages.filter((message) => message.chatId === b.id);
      const lastMessageA = lodash.last(chatMessagesA);
      const lastMessageB = lodash.last(chatMessagesB);

      if (lastMessageA && lastMessageB) {
        return lastMessageB.time - lastMessageA.time;
      }
    });

    return (
      <div className="content chats">
        {isSearch && (
          <InputSearch
            value={inputSearch}
            onChange={this.handleChangeInputSearch}
          />
        )}

        <ul>
          {sortedChats.map((chat) => {
            const onClick = () => this.handleClickChat(chat);
            const onDelete = () => this.handleClickDeleteChat(chat);
            const participant = users.find((user) => user.id === chat.participants.find((id) => id !== currentUser.id));

            const chatMessages = messages.filter((m) => m.chatId === chat.id);
            const lastMessage = lodash.last(chatMessages);

            return this.renderChat(chat, participant, lastMessage)
          })}
        </ul>
        {foundMessages.length
          ? (
            <ul>
              <div className="found-messages-headline">Messages</div>
              {foundMessages.map((m) => {
                const participant = users.find((user) => user.id === m.userId);
                const foundMessageChat = chats.find((chat) => chat.id === m.chatId);
                const onClick = () => this.handleClickChat(foundMessageChat);

                return this.renderMessage(m, participant, onClick)
              })}
            </ul>
          )
          : ''
        }
      </div>
    )
  }
}
