import React from 'react';
import lodash from 'lodash';
import { browserHistory } from 'react-router';

import api from '../api';
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

  handleClickChat = async (chat) => {
    const { messageToForward, messages, isEditMessages } = this.props.app.state;

    if (messageToForward) {
      const message = {
        user: this.props.app.state.currentUser.id,
        chat: chat.id,
        forward_to: messageToForward.id
      };

      const data = await api('create_message', message);

      if (data.error) {
        this.props.app.handleOpenPopUp({
          message: data.error.description,
        });
      }

      if (data.message) {
        const newMessages = messages.concat(data.message);
        this.props.app.setState({ messages: newMessages, messageToForward: null, isEditMessages: false });
      }
    }

    browserHistory.push(`/messages/${chat.id}`);
  }

  handleClickDeleteChat = async (chat) => {
    const data = await api('delete_chat', chat);

    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description,
      });
    } else {
      const { chats } = this.props.app.state;
      const filteredChats = chats.filter((c) => c.id !== chat.id);

      this.props.app.setState({ chats: filteredChats });
    }

    const { chats } = this.props.app.state;
    const filteredChats = chats.filter((c) => c.id !== chat.id);

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
    const onClick = () => this.handleClickChat(chat);
    const onDelete = () => this.handleClickDeleteChat(chat);

    return (
      <li key={chat.id}>
        <div className="img-wrapper" onClick={onClick}>
          {this.renderStatus(user)}
          <img src={getImg(user.avatar)} />
        </div>
        <div className="chat-data" onClick={onClick}>
          <div className="data">
            <div className="name">{user.name}</div>
            <span className="time">{message ? formatDate(message.time) : ''}</span>
          </div>
          <div className="text">
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
        <div className="img-wrapper">
          <img src={getImg(user.avatar)} />
        </div>
        <div className="chat-data">
          <div className="name">{user.name}</div>
          <span className="time">{formatDate(message.time)}</span>
          <div className="text">
            <div dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
          </div>
        </div>
      </li>
    )
  }

  render () {
    const { inputSearch } = this.state;
    const {
      users,
      currentUser,
      isSearch,
      isStatusVisible,
      messages,
      chats
    } = this.props.app.state;

    const currentUsersChats = chats.filter((chat) => {
      return chat.participants.includes(currentUser.id);
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
