import React from 'react';
import { browserHistory } from 'react-router';
import { Container } from 'react-bulma-components';

import api from '../../api';
import { getImg } from '../../helpers';
import InputSearch from '../common/search';
import './styles.scss';

export default class Contacts extends React.Component {
  handleChangeInputSearch = async (value) => {
    const data = await api('get_users', { login: value });

    if (data.error) {
      this.props.openPopup({
        message: data.error.description,
      });
    }

    if (data.users) {
      this.props.updateRecords('users', data.users, this.props);
    }
  }

  handleClickOpenContactInfo = (user) => {
    this.props.closeSearch();
    browserHistory.push(`/contact-info/${user.id}`);
  }

  handleClickContact = async (user) => {
    const { chats, users } = this.props.records;
    const { currentUser, search } = this.props;

    if (search.visible) {
      this.props.closeSearch();
      return browserHistory.push(`/contact-info/${user.id}`)
    }

    const isChatExist = chats.find((chat) => {
      if (chat.participants.includes(user.id) && chat.participants.includes(currentUser.id)) {
        return true;
      } else {
        return false;
      }
    })

    if (isChatExist) {
      const chatId = chats.find((chat) => (chat.participants.includes(user.id) && chat.participants.includes(currentUser.id))).id;

      return browserHistory.push(`/messages/${chatId}`);
    }

    if (!isChatExist) {
      const newChat = {
        participants: [ currentUser.id, user.id ]
      }
      const data = await api('create_chat', newChat);

      if (data.chat) {
        this.props.createRecords('chats', data.chat, this.props);
        return browserHistory.push(`/messages/${data.chat.id}`);
      }

      if (data.error) {
        this.props.openPopup({
          message: data.error.description,
        });
      }
    }
  }

  renderStatus = (user) => {
    if (this.props.isStatusVisible) {
      return <span className="user-status">{user.status}</span>
    }
  }

  renderInputSearch = () => {
    if (this.props.search.visible) {
      return (
        <InputSearch
          onChange={(e) => this.handleChangeInputSearch(e.target.value)}
          onCancel={() => this.props.closeSearch()}
        />
      )
    }
  }

  render () {
    const { currentUser, search } = this.props;

    const contacts = this.props.records.users.filter((user) => {
      return currentUser.contacts.includes(user.id);
    });
    const users = search.visible
      ? this.props.records.users
      : contacts;
    const filteredUsers = users.filter((user) => user.id !== currentUser.id);

    return (
        <Container
          className="contacts"
          fullhd={{ display: 'contents' }}
          breakpoint="fullhd"
        >
          {/* {this.renderInputSearch()} */}
          <ul>
            {filteredUsers.map((user) => {
              const onClickUserName = () => this.handleClickContact(user);
              const onClickAvatar = () => this.handleClickOpenContactInfo(user);

              return (
                <li key={user.id}>
                  <div className="avatar" onClick={onClickAvatar} style={{ backgroundImage: `url(${getImg(user.avatar)})` }}></div>
                  <div className="user-name" onClick={onClickUserName}>
                    <span>{user.name}</span>
                    {this.renderStatus(user)}
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
    )
  }
}
