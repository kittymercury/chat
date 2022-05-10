import React from 'react';
import { browserHistory } from 'react-router';
import { Container, Section, Block, Button, Heading } from 'react-bulma-components';
import lodash from 'lodash';

import * as ActionHelpers from '../../actions/helpers';
import api from '../../api';
import { getImg } from '../../helpers';
import error from '../../images/error.jpeg';
import './styles.scss';

export default class ContactInfo extends React.Component {
  componentDidMount = async () => {
    const id = +this.props.location.pathname.split('/')[2];
    const data = await ActionHelpers.getUserData(id);
    this.props.getUserData(data);
  }

  handleClickOpenChat = async (user) => {
    const { chats } = this.props.records;
    const chat = _.find(chats, chat => chat.participants.includes(user.id));

    if (chat) browserHistory.push(`/messages/${chat.id}`);

    if (!chat) {
      const { currentUser } = this.props;
      const newChat = { participants: [ currentUser.id, user.id ]};
      const data = await ActionHelpers.createRecords('chats', newChat);

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

  handleClickAddToContacts = async (user) => {
    const contacts = [ ...this.props.currentUser.contacts, user.id ];
    const data = await ActionHelpers.updateCurrentUser({
      id: this.props.currentUser.id,
      contacts
    });
    this.props.updateCurrentUser(data);
  }

  handleClickRemoveContact = (user) => {
    this.props.openPopup({
      message: `Do you want to remove ${user.name} from your Contacts?`,
      type: 'confirm',
      callback: () => this.handleConfirmRemoveContact(user)
    });
  }

  handleConfirmRemoveContact = async (user) => {
    const contacts = this.props.currentUser.contacts.filter((id) => id !== user.id);
    const data = await ActionHelpers.updateCurrentUser({
      id: this.props.currentUser.id,
      contacts
    });
    this.props.updateCurrentUser(data);
  }

  render () {
    const { currentUser, user } = this.props;

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
            <Section>
              <Button onClick={() => this.handleClickOpenChat(user)}>Open chat</Button>
              <Button onClick={() => this.handleClickRemoveContact(user)}>Remove from contacts</Button>
            </Section>
          )
          : (
            <Section>
              <Button onClick={() => this.handleClickAddToContacts(user)}>Add to contacts</Button>
            </Section>
          )
        }
      </Container>
    )
  }
}