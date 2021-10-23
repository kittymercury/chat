import React from 'react';
import lodash from 'lodash';
import { browserHistory } from 'react-router';

import api from '../api';
import InputSearch from '../common/input-search';
import { getImg, formatDate } from '../helpers';
import { DELETED_USERNAME } from '../constants';

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
    const chat = chats.find((chat) => chat.id === message.chat);
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

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum/1000;
  }

  renderMessagePreview = (message) => {
    if (message) {
      if (message.forward_to) {
        return <div style={{ color: 'gray' }}>Forwarded message</div>
      }
      if (message.content) {
        return <div>{message.content}</div>
      }
    }
  }

  renderStatus = (user = {}) => {
    if (this.props.app.state.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status || 'offline'}`}></i>
    }
  }

  renderChat = (chat, user = {}, message) => {
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
            <div className="name">{user.name || DELETED_USERNAME}</div>
            <span className="time">{message ? formatDate(message.created_at) : ''}</span>
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

  renderMessage = (message, user = {}) => {
    if (!message) return;
    return (
      <li key={message.id} onClick={() => this.handleClickFoundMessage(message)}>
        <div className="img-wrapper">
          <img src={getImg(user.avatar)} />
        </div>
        <div className="chat-data">
          <div className="data">
            <div className="name">{user.name || DELETED_USERNAME}</div>
            <span className="time">{message ? formatDate(message.created_at) : ''}</span>
          </div>
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
        const participant = chat.participants.find((id) => id !== currentUser.id);
        const user = users.find((u) => u.id === participant) || {};

        if (user.name.toLowerCase().includes(inputSearch.toLowerCase())) {
          foundChats.push(chat);
        }
      });
    } else {
      foundChats = currentUsersChats;
    }

    const currentUsersChatMessages = currentUsersChats.map((chat) => {
      return messages.filter((m) => m.chat === chat.id);
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

    let chatsWithMessages = [];

    foundChats.forEach((chat) => {
      if (messages.find((m) => m.chat === chat.id)) {
        chatsWithMessages.push(chat)
      }
    })


    const sortedChats = chatsWithMessages.sort((a, b) => {
      const chatMessagesA = messages.filter((message) => message.chat === a.id);
      const chatMessagesB = messages.filter((message) => message.chat === b.id);
      const lastMessageA = this.toTimestamp(lodash.last(chatMessagesA).created_at);
      const lastMessageB = this.toTimestamp(lodash.last(chatMessagesB).created_at);

      if (lastMessageA && lastMessageB) {
        return lastMessageB - lastMessageA;
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

        <ul className="users-chats">
          {sortedChats.map((chat) => {
            const participant = users.find((user) => user.id === chat.participants.find((id) => id !== currentUser.id));
            const chatMessages = messages.filter((m) => m.chat === chat.id);
            const lastMessage = lodash.last(chatMessages);

            return this.renderChat(chat, participant, lastMessage)
          })}
        </ul>
        {foundMessages.length
          ? (
            <div className="found-messages-chats">
              <div className="found-messages-headline">Messages</div>
              <ul>
                {foundMessages.map((m) => {
                  const participant = users.find((user) => user.id === m.created_by);
                  const foundMessageChat = chats.find((chat) => chat.id === m.chat);
                  const onClick = () => this.handleClickChat(foundMessageChat);

                  return this.renderMessage(m, participant, onClick)
                })}
              </ul>
            </div>
          )
          : ''
        }
      </div>
    )
  }
}
