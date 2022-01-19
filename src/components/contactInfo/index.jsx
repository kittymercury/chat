import React from 'react';
import { browserHistory } from 'react-router';
import { Container, Section, Block, Button, Heading, Hero } from 'react-bulma-components';

import api from '../../api';
import { getImg } from '../../helpers';
import error from '../../images/error.jpeg';
import './styles.scss';

export default class ContactInfo extends React.Component {
  componentDidMount = async () => {
    const userId = this.props.location.pathname.split('/')[2];
    const data = await api('get_users', { id: userId });

    if (data.error) {
      this.props.openPopup({
        message: data.error.description,
      });
    }

    if (data.users) {
      this.props.getContactInfo(data.users[0]);
    }
  }

  handleClickOpenChat = async (user) => {
    const { chats } = this.props.records;
    const chat = chats.find((chat) => chat.participants.includes(user.id));

    if (chat) {
      browserHistory.push(`/messages/${chat.id}`)
    }

    if (!chat) {
      const { currentUser } = this.props;
      const newChat = {
        participants: [ currentUser.id, user.id ]
      }
      const data = await api('create_chat', newChat);

      if (data.chat) {
        this.props.createRecords('chats', data.chat, this.props)
        return browserHistory.push(`/messages/${data.chat.id}`);
      }

      if (data.error) {
        this.props.openPopup({
          message: data.error.description,
        });
      }
    }
  }

  handleClickAddToContacts = (user) => {
    this.props.updateCurrentUser(this.props.currentUser.contacts.concat(user.id));
  }

  handleClickRemoveContact = (user) => {
    this.props.openPopup({
      message: `Do you want to remove ${this.state.user.name} from your Contacts?`,
      type: 'confirm',
      callback: () => this.handleConfirmRemoveContact(user)
    });
  }

  handleConfirmRemoveContact = (user) => {
    const contacts = this.props.currentUser.contacts.filter((id) => id !== user.id);
    this.props.handleSubmitUser({ contacts });
  }

  render () {
    const { user, currentUser } = this.props;

    if (!user) {
      return (
        <Container className="contact-info">
          <Section style={{ textAlign: 'center' }}>
            <Heading subtitle>user not found</Heading>
            {/* <Block className="error-image" style={{ backgroundImage: `url(${getImg(error)})` }}></Block> */}
          </Section>
        </Container>
      )
    }

    return (
      <Container
        fullhd={{ display: 'contents' }}
        breakpoint="fullhd"
        className="contact-info"
      >
        <Section className="info-wrapper">
          <Block className="user-avatar-image" style={{ backgroundImage: `url(${getImg(user.avatar)})` }}></Block>
          <Block className="user-login">@{user.login}</Block>
        </Section>
        {currentUser.contacts.includes(user.id)
          ? (
            <Block>
              <Button onClick={() => this.handleClickOpenChat(user)}>Open chat</Button>
              <Button onClick={() => this.handleClickRemoveContact(user)}>Remove from contacts</Button>
            </Block>
          )
          : <Button onClick={() => this.handleClickAddToContacts(user)}>Add to contacts</Button>
        }
      </Container>
    )
  }
}
