import React from 'react';
import { Dropdown } from 'react-bulma-components';
import { browserHistory } from 'react-router';

import { getImg } from '../helpers';
import noAvatar from '../images/no-avatar.png';
import api from '../api';

export default class DropdownMessages extends React.Component {
  handleClickToProfile = () => {
    // logics that gets user from chat.id
    // browserHistory.push(`/contact-info/${user.id}`);
  }

  getChat = () => {
    const chatId = this.props.location.pathname.split('/')[2];
    return this.props.records.chats.find((chat) => chat.id === Number(chatId));
  }

  getParticipant = () => {
    const { chats, users } = this.props.records;
    const { currentUser } = this.props;
    const chat = this.getChat();
    if (!chat) return;
    const participantId = chat.participants.find((id) => id !== currentUser.id);
    return users.find((user) => user.id === Number(participantId));
  }

  handleClickClearChat = () => {
    const chat = this.getChat();
    const participant = this.getParticipant();

    this.props.openPopup({
      message: `Do you want to clear chat with ${participant.name}?`,
      type: 'confirm',
      callback: () => this.handleConfirmClearChat(chat)
    });
  }

  handleConfirmClearChat = async (chat) => {
    const data = await api('delete_chat', chat);

    if (data.error) {
      this.props.openPopup({ message: data.error.description });
    }

    if (data.deleted) {
      // const { chats } = this.props.records;
      // const filteredChats = chats.filter((c) => c.id !== chat.id);

      // this.props.app.setState({ chats: filteredChats, isMsgMenuActive: false });
      this.props.deleteRecords('chats', data.deleted, this.props);
      browserHistory.push('/chats');
    }
  }

  render () {
    return (
      <Dropdown
        className="navbar-dropdown"
        closeOnSelect="true"
        align="right"
        label={<div className="user-avatar-small" style={{ backgroundImage: `url(${getImg(this.props.label)})` }}/>}
      >
        <Dropdown.Item value="to-profile">
          <div onClick={this.handleClickToProfile}>To profile</div>
        </Dropdown.Item>
        <Dropdown.Item value="search">
          <div onClick={() => this.props.openSearch()}>Search</div>
        </Dropdown.Item>
        <Dropdown.Item value="select">
          <div onClick={() => this.props.turnOnSelectMode()}>Select messages</div>
        </Dropdown.Item>
        {/* <Dropdown.Item value="clear-chat" onClick={() => this.handleClickClearChat()}> */}
        <Dropdown.Item value="clear-chat">
          <div onClick={this.handleClickClearChat}>Clear chat</div>
        </Dropdown.Item>
      </Dropdown>
    )
  }
}
