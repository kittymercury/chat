import React from 'react';
import { browserHistory } from 'react-router';
import { Navbar, Container, Block, Icon, Form, Button, Card } from 'react-bulma-components';

import * as ActionHelpers from '../../actions/helpers';
import api from '../../api';
import { formatDate, getImg } from '../../helpers';
import { DELETED_USERNAME, CURRENT_TIMESTAMP } from '../../constants';
import './styles.scss';

import { StyledLi, StyledCloud } from './styles.js';

export default class Messages extends React.Component {
  componentDidMount = async () => {
    this.setScrollBehavior();
    this.readMessages();

    const id = this.getParticipant().id;
    const data = await ActionHelpers.getUserData(id);
    this.props.getUserData(data);
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

  readMessages = async () => {
    const { messages } = this.props.records;

    const data = await api('read_messages', this.getChat());

    if (data.error) {
      this.props.openPopup({ message: data.error.description });
    }

    if (data.messages) {
      const dataMessagesMap = _.keyBy(data.messages, 'id');
      const updatedMessages = messages.map((m) => {
        return dataMessagesMap[m.id] || m
      });

      // this.props.app.setState({ messages: updatedMessages })
      this.props.updateRecords('messages', updatedMessages, this.props);
    }
  }

  setScrollBehavior = () => {
    const list = document.querySelector('.messages ul');
    list.style['scroll-behavior'] = 'none';
    // this.props.app.setScroll();
    const { foundMessage } = this.props;
    if (foundMessage) {
      const foundM = document.getElementById(`m-${foundMessage.id}`);
      foundM.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  scrollToMessage = (message) => {
    if (!message) return;
    const chatId = this.getChat().id;
    if (message.chat !== chatId) return;
    let element = document.getElementById(`m-${message.id}`);
    element.scrollIntoView({ block: "start", behavior: "smooth" });
    element = element.classList.add('marked');
  }

  tryHighlight = (content) => {
    let html = content;
    const { search } = this.props;
    const re = new RegExp(search.value, 'gi');

    if (search.value) {
      html = html.replace(re, `<span style="background-color: #ffff0038">${search.value}</span>`)
    }
    return { __html: html };
  }

  changeInputValue = (type) => async (e) => {
    this.props.changeInputValue({ type, page: 'messages', value: e.target.value });
    clearTimeout(this.typingTimeout);
    await api('typing', { chat: this.getChat().id });
    this.typingTimeout = setTimeout(() => api('typing', {}), 5000)
  }

  handleClickMessage = async (message) => {
    const { isSelectMode, selectedMessages } = this.props.settings;

    if (!isSelectMode) this.props.clickMessage(message.id);
    if (isSelectMode) this.props.selectMessage(message.id);
  }


  interactWithSelectedMessages = (action) => {
    const { selectedMessages } = this.props.settings;
    if (action === 'delete') {
      return (
        this.props.openPopup({
          message: `Do you want to delete ${selectedMessages.length} messages?`,
          type: 'confirm',
          callback: () => this.handleConfirmDeleteSelectedMessages()
        })
      )
    }

    if (action === 'forward') {
      this.props.forward();
      browserHistory.push('/chats');
    }
  }

  handleConfirmDeleteSelectedMessages = async () => {
    const { messages } = this.props.records;
    const { selectedMessages } = this.props;

    for (let i = 0; i < selectedMessages.length; i++) {
      const message = messages.find((m) => m.id === selectedMessages[i]);
      const data = await api('delete_message', message);
      if (data.error) {
        this.props.openPopup({ message: data.error.description });
      }

      if (data.deleted) {
        this.props.deleteRecords('messages', data.deleted, this.props);
        // this.props.app.setState({ selectedMessages: [] })
        // const newMessages = this.props.app.state.messages.filter((m) => m.id !== selectedMessages[i]);
        // this.props.app.setState({
        //   messages: newMessages,
        //   isSelectMode: false
        // })
      }
    }
  }

  handleClickForward = (message) => {
    this.props.selectMessage(message.id);
    this.props.forward();
    browserHistory.push('/chats');
  }

  handleClickEditMessage = (message) => {
    this.props.editMessage({ message, content: message.content });
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

  handleClickDeleteMessage = (message) => {
    this.props.openPopup({
      message: `Do you want to delete message?`,
      type: 'confirm',
      callback: () => this.handleConfirmDeleteMessage(message)
    });
  }

  handleConfirmDeleteMessage = (message) => {
    this.props.deleteRecords('messages', message, this.props)
    ActionHelpers.deleteRecords('message', message);
  }

  handleSendMessage = async () => {
    const { messages } = this.props.records;
    const { inputValue, messageToReply } = this.props.page;

    if (!inputValue.trim().length) return;
    const newMessage = {
      user: this.props.currentUser.id,
      chat: this.getChat().id,
      content: inputValue
    }

    if (messageToReply) {
      newMessage.reply_to = messageToReply.id;
    }

    const data = await ActionHelpers.createRecords('message', newMessage);
    this.props.createRecords('messages', data.message, this.props);
  }

  handleSubmitEditedMessage = async () => {
    const { inputValue, messageToEdit } = this.props.page;

    if (messageToEdit.content === inputValue) return;
    const editedMessage = {
      id: messageToEdit.id,
      content: inputValue
    }

    const data = await ActionHelpers.updateRecords('message', editedMessage);
    this.props.updateRecords('messages', data.message, this.props);
  }

  renderEditMessageFeatures = (id) => {
    const { currentUser } = this.props;
    const { messageWithFeatures } = this.props.page;
    const { messages } = this.props.records;
    const { isSelectMode } = this.props.settings;

    if (isSelectMode) return null;

    if (messageWithFeatures === id) {
      const message = messages.find((m) => m.id === messageWithFeatures);
      const isMsgMine = message.user === currentUser.id;

      return (
        <Button.Group hasAddons="true" size="medium">
          <Button onClick={() => this.props.reply(message)}>Reply</Button>
          <Button onClick={() => this.handleClickForward(message)}>Forward</Button>
          <Button onClick={() => this.handleClickDeleteMessage(message)}>Delete</Button>
          {(isMsgMine && !message.forward_to) && (
            <Button onClick={() => this.handleClickEditMessage(message)}>Edit</Button>
          )}
        </Button.Group>
      )
    }
  }

  renderMessageReply = (message) => {
    const { messages, users } = this.props.records;
    const { currentUser } = this.props;
    if (message.reply_to) {
      const messageReplyTo = messages.find((m) => m.id === message.reply_to);

      if (messageReplyTo) {
        const user = currentUser.id === messageReplyTo.user
          ? currentUser
          : users.find((user) => user.id === messageReplyTo.user) || {};
        return (
          <div className="message-reply" onDoubleClick={() => this.scrollToMessage(messageReplyTo)}>
              <div className="reply-wrapper">
                <div className="to-user">
                  <span>Reply to </span>
                  <span>{user.name || DELETED_USERNAME}</span>
                </div>
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

  renderMessageForward = (message) => {
    const { users, messages } = this.props.records;
    const { currentUser } = this.props;

    if (message.forward_to) {
      const forwardedMessage = messages.find((m) => m.id === message.forward_to);

      if (forwardedMessage) {
        const user = currentUser.id === forwardedMessage.user
          ? currentUser
          : users.find((user) => user.id === forwardedMessage.user) || {};
        return (
          <div className="message-forward" onDoubleClick={() => this.scrollToMessage(forwardedMessage)}>
            <div className="forwarded-from">
              <span>Forwarded from</span>
              <span>{user.name || DELETED_USERNAME}</span>
            </div>
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

  renderInputButton = () => {
    const { messageToEdit } = this.props.page;

    if (messageToEdit) {
      return (
        <Button className="input-button" onClick={this.handleSubmitEditedMessage}>
          <i className="fas fa-check"></i>
        </Button>
      )
    }

    return (
      <Button className="input-button" onClick={this.handleSendMessage}>
        <i className="fas fa-arrow-right"></i>
      </Button>
    )
  }

  renderInputMessageToReply = () => {
    const { messageToReply } = this.props.page;
    const { currentUser } = this.props;
    const { users } = this.props.records;

    if (messageToReply) {
      const user = currentUser.id === messageToReply.user
        ? currentUser
        : users.find((user) => user.id === messageToReply.user);

      return (
        <Card className="input-reply">
          <Card.Header>
            <div>
              <i className="fas fa-reply"></i>
              <span>{user.name} </span><br/>
            </div>
            <Card.Header.Icon>
              <span className="cancel-replying" onClick={() => this.props.cancelReplying()}>
                <i className="fas fa-times"></i>
              </span>
            </Card.Header.Icon>
          </Card.Header>
          <Card.Content>
            <span className="message-to-reply-content">{messageToReply.content}</span>
          </Card.Content>
        </Card>
      )
    }
  }

  renderSeenCheck = (condition) => {
    if (condition) {
      return (
        <span className="seen">
          <i className="fas fa-check"></i>
        </span>
      )
    }
  }

  renderOptionsForSelectedMessages = () => {
    if (!this.props.settings.isSelectMode) return null;
    return (
      <Button.Group className="options-selected-messages">
        <Button onClick={() => this.interactWithSelectedMessages('delete')}>
          <i className="fas fa-ban"></i>
          <span>Delete</span>
        </Button>
        <Button onClick={() => this.interactWithSelectedMessages('forward')}>
          <i className="fas fa-share-square"></i>
          <span>Forward</span>
        </Button>
      </Button.Group>
    )
  }

  renderInputMessages = () => {
    if (this.props.settings.isSelectMode) return null;
    return (
      <div className="input-fixed" style={{ display: 'block' }}>
        {this.renderInputMessageToReply()}
        <Form.Field>
          <Form.Control className="input-wrapper">
            <Form.Input
              className="input-messages"
              autoComplete="off"
              style={{ flex: 1 }}
              placeholder="Type your message here"
              value={this.props.page.inputValue}
              onChange={this.changeInputValue('messages')}
            />
            <Icon align="left" size="medium">
              {this.props.messageToEdit
                ? <i className="fas fa-pen"></i>
                : <i className="far fa-paper-plane"></i>
              }
            </Icon>
            {this.renderInputButton()}
          </Form.Control>
        </Form.Field>
      </div>
    )
  }

  // renderUserTyping = () => {
  //   const { typing } = this.props;
  //   const participant = this.getParticipant();
  //   if (!participant) return null;
  //
  //   const chat = this.getChat();
  //   if (!chat) return null;
  //
  //   if ((participant.id === typing.user) && (chat.id === typing.chat)) {
  //     return (
  //       <div className="user-is-typing">
  //         <i className="fas fa-pen-fancy"></i>
  //         <span>{participant.name} is typing...</span>
  //       </div>
  //     )
  //   }
  // }

  render () {
    console.log({p: this.props.records.themes});
    const { users, chats, messages } = this.props.records;
    const {
      messageToEdit,
      messageToReply
    } = this.props.page;

    const {
      currentUser,
      search,
      typing,
      foundMessage,
    } = this.props;

    const { isStatusVisible, isSelectMode, selectedMessages, theme } = this.props.settings;

    const chat = this.getChat() || {};

    let foundMessages = [];
    if (search.visible && search.value) {
      messages.filter((message) => message.chat === chat.id).forEach((message) => {
        if (message.content && message.content.toLowerCase().includes(search.value.toLowerCase())) {
          foundMessages.push(message);
        }
      });
    } else {
      foundMessages = messages.filter((message) => message.chat === chat.id);
    }

    return (
      <Container
        className="messages"
        fullhd={{ display: 'contents' }}
        breakpoint="fullhd"
      >
        <ul id="messages-list">
          {foundMessages.map((message) => {
            let className = "message-data-content";
            if (foundMessage && (message.id === foundMessage.id)) {
              className = "message-data-content highlight";
            };

            const user = currentUser.id === message.user
              ? currentUser
              : users.find((user) => user.id === message.user) || {};
            const isCurrentUsersMessage = message.user === currentUser.id;
            const isSelected = selectedMessages.includes(message.id);

            return (
              <StyledLi key={message.id} theme={theme} selected={isSelected} user={isCurrentUsersMessage ? 'me' : 'other'} id={`m-${message.id}`}>
                <Block onClick={() => this.handleClickMessage(message)}>
                  {this.renderMessageReply(message)}
                  {this.renderMessageForward(message)}
                  <div className="message-data">
                    <div className={className} dangerouslySetInnerHTML={this.tryHighlight(message.content)} />
                    <div className="data-wrapper">
                      <span className="edited">{message.edited ? 'Edited' : ''}</span>
                      <span className="message-data-time">{formatDate(message.created_at)}</span>
                      {this.renderSeenCheck(true)}
                    </div>
                  </div>
                </Block>
                {this.renderEditMessageFeatures(message.id)}
              </StyledLi>
            )
          })}
        </ul>

        {/* {this.renderUserTyping()} */}
        {this.renderOptionsForSelectedMessages()}
        {this.renderInputMessages()}
      </Container>
    )
  }
}
