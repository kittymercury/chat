import React from 'react';
import { browserHistory } from 'react-router';

import api from '../../api';
import { getImg } from '../../helpers';
import './styles.scss';

export default class ContactInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: null, loaded: false }
  }

  componentDidMount = async () => {
    const userId = Number(this.props.params.userId);
    const data = await api('get_users', { id: userId });

    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description,
      });
    }

    if (data.users) {
      this.setState({ user: data.users[0], loaded: true })
    }
  }

  handleClickOpenChat = async (user) => {
    const { chats } = this.props.app.state;
    const chat = chats.find((chat) => chat.participants.includes(user.id));

    if (chat) {
      browserHistory.push(`/messages/${chat.id}`)
    }

    if (!chat) {
      const { currentUser } = this.props.app.state;
      const newChat = {
        participants: [ currentUser.id, user.id ]
      }
      const data = await api('create_chat', newChat);

      if (data.chat) {
        this.props.app.setState({ chats: this.props.app.state.chats.concat(data.chat) });
        return browserHistory.push(`/messages/${data.chat.id}`);
      }

      if (data.error) {
        this.props.app.handleOpenPopUp({
          message: data.error.description,
        });
      }
    }
  }

  handleClickAddToContacts = (user) => {
    this.props.app.handleSubmitUser({ contacts: this.props.app.state.currentUser.contacts.concat(user.id) });
    // this.props.app.setState({ users: this.props.app.state.users.concat(user) })
  }

  handleClickRemoveContact = (user) => {
    this.props.app.handleOpenPopUp({
      message: `Do you want to remove ${this.state.user.name} from your Contacts?`,
      onConfirm: () => this.handleConfirmRemoveContact(user)
    });
  }

  handleConfirmRemoveContact = (user) => {
    const contacts = this.props.app.state.currentUser.contacts.filter((id) => id !== user.id)

    this.props.app.handleSubmitUser({ contacts });
    this.props.app.setState({ popUp: null });
  }

  renderStatus = (user) => {
    if (this.props.app.state.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status}`}></i>
    }
  }

  render () {
    const user = this.state.user;
    const currentUser = this.props.app.state.currentUser;

    if (!this.state.loaded) return null;

    if (!user) {
      return (
        <div className="content contact-info">
          user not found
        </div>
      )
    }

    return (
      <div className="content contact-info">
        <div className="info-wrapper">
          {currentUser.contacts.includes(user.id)
            ? (
              <div className="remove-from-contacts">
                <span onClick={() => this.handleClickRemoveContact(user)}>Remove</span>
              </div>
            )
            : ''}
          <div>
            <img className="user-avatar-image" src={getImg(user.avatar)} />
            {this.renderStatus(user)}
          </div>
          <div className="user-name">{user.name}</div>
          <div className="user-login">@{user.login}</div>
        </div>
        <div className="button-contact-info-wrapper">
          {currentUser.contacts.includes(user.id)
            ? (
                <div className="button-contact-info" onClick={() => this.handleClickOpenChat(user)}>Open chat</div>
            )
            : (
                <div className="button-contact-info" onClick={() => this.handleClickAddToContacts(user)}>Add to contacts</div>
            )}
        </div>
      </div>
    )
  }
}
