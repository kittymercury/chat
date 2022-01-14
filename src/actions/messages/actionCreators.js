import * as Types from './types';

export const onMessage = (id) => {
  return { type: Types.ON_MESSAGE, payload: id }
}

export const reply = (message) => {
  return { type: Types.REPLY, payload: message }
}

export const cancelReplying = (message) => {
  return { type: Types.REPLY, payload: message }
}

export const forward = (message) => {
  return { type: Types.FORWARD, payload: message }
}

export const editMessage = (message) => {
  return { type: Types.EDIT_MESSAGE, payload: message }
}

export const changeInputMessages = (value) => {
  return { type: Types.CHANGE_INPUT_MESSAGES, payload: value }
}


//   setScrollBehavior = () => {
//     const list = document.querySelector('.messages ul');
//     list.style['scroll-behavior'] = 'none';
//     this.props.app.setScroll();
//     const { foundMessage } = this.props.app.state;
//     if (foundMessage) {
//       const foundM = document.getElementById(`m-${foundMessage.id}`);
//       foundM.scrollIntoView({ block: "start", behavior: "smooth" });
//     }
//   }
//
//   scrollToMessage = (message) => {
//     if (!message) return;
//     const chatId = this.getChat().id;
//     if (message.chat !== chatId) return;
//     let element = document.getElementById(`m-${message.id}`);
//     element.scrollIntoView({ block: "start", behavior: "smooth" });
//     element = element.classList.add('marked');
//   }
//
//   tryHighlight = (content) => {
//     let html = content;
//     const { inputSearch } = this.state;
//     const re = new RegExp(inputSearch, 'gi');
//
//     if (inputSearch) {
//       html = html.replace(re, `<span style="background-color: #ffff0038">${inputSearch}</span>`)
//     }
//     return { __html: html };
//   }
//
//   changeInputValue = async (name, e) => {
//     this.setState({ [name]: e.target.value })
//
//     clearTimeout(this.typingTimeout);
//     await api('typing', { chat: this.getChat().id });
//     this.typingTimeout = setTimeout(() => api('typing', {}), 5000)
//   }
//
//   // handleClickAvatar = (id) => {
//     // const user = this.props.app.state.users.find((u) => u.id === id);
//     // if (user) {
//     //   browserHistory.push(`/contact-info/${user.id}`);
//     // }
//
//     // this.props.app.setState({ isMsgMenuActive: isMsgMenuActive ? false : true });
//   // }
//
//   handleClickMessage = (id) => {
//     this.props.clickMessage(id);
//     console.log({msgwithfeatures: this.props.messageWithFeatures});
//
//     // add for select mode
//   }
//   // handleClickMessage = async (id) => {
//   //   const { messageWithFeatures } = this.state;
//   //   const { isSelectMode, messages, selectedMessages } = this.props.app.state;
//   //
//   //   if (!isSelectMode) {
//   //     if (messageWithFeatures === id) {
//   //       this.setState({ messageWithFeatures: null })
//   //     }
//   //
//   //     if (messageWithFeatures !== id || !messageWithFeatures) {
//   //       this.setState({ messageWithFeatures: id });
//   //     }
//   //   }
//   //
//   //   if (isSelectMode) {
//   //     const msg = messages.find((m) => m.id === id);
//   //     const $message = document.getElementById(`m-${id}`);
//   //     const isSelected = selectedMessages.includes(msg.id);
//   //     if (isSelected) {
//   //       $message.classList.remove('selected');
//   //       const filteredSelectedMessages = selectedMessages.filter((id) => id !== msg.id);
//   //       this.props.app.setState({ selectedMessages: filteredSelectedMessages })
//   //     }
//   //
//   //     if (!isSelected) {
//   //       $message.classList.add('selected');
//   //       this.props.app.setState({ selectedMessages: selectedMessages.concat(msg.id) })
//   //     }
//   //   }
//   // }
//
//   handleClickClearChat = () => {
//     const chat = this.getChat();
//     const participant = this.getParticipant();
//
//     this.props.openPopup({
//       message: `Do you want to clear chat with ${participant.name}?`,
//       onConfirm: () => this.handleConfirmClearChat(chat)
//     });
//   }
//
//   handleConfirmClearChat = async (chat) => {
//     const data = await api('delete_chat', chat);
//
//     if (data.error) {
//       this.props.openPopup({
//         message: data.error.description,
//       });
//     }
//
//     if (data.deleted) {
//       const { chats } = this.props.app.state;
//       const filteredChats = chats.filter((c) => c.id !== chat.id);
//
//       this.props.app.setState({ chats: filteredChats, isMsgMenuActive: false });
//       browserHistory.goBack();
//     }
//   }
//
//   handleClickTurnOffSelectMode = () => {
//     this.props.app.setState({
//       isSelectMode: false,
//       selectedMessages: []
//     })
//   }
//
//   interactWithSelectedMessages = (action) => {
//     const { selectedMessages } = this.props.app.state;
//     if (action === 'delete') {
//       this.props.openPopup({
//         message: `Do you want to delete ${selectedMessages.length} messages?`,
//         onConfirm: () => this.handleConfirmDeleteSelectedMessages()
//       })
//     }
//
//     if (action === 'forward') {
//       browserHistory.push('/chats');
//     }
//   }
//
//   handleConfirmDeleteSelectedMessages = async () => {
//     const { messages, selectedMessages  } = this.props.app.state;
//
//     for (let i = 0; i < selectedMessages.length; i++) {
//       const message = messages.find((m) => m.id === selectedMessages[i]);
//       const data = await api('delete_message', message);
//       if (data.error) {
//         this.props.openPopup({
//           message: data.error.description,
//         });
//       }
//
//       if (data.deleted) {
//         this.props.app.setState({ selectedMessages: [] })
//         const newMessages = this.props.app.state.messages.filter((m) => m.id !== selectedMessages[i]);
//         this.props.app.setState({
//           messages: newMessages,
//           isSelectMode: false
//         })
//       }
//     }
//   }
//
//   renderEditMessageFeatures = () => {
//     const { messages, currentUser } = this.props.app.state;
//     const { messageWithFeatures } = this.state;
//
//     if (messageWithFeatures) {
//       const message = messages.find((m) => m.id === messageWithFeatures);
//       const isMsgMine = message.user === currentUser.id;
//
//       return (
//         <div className="edit-messages-features">
//           <div onClick={() => this.handleClickReply(message)}>
//             <i className="fas fa-reply"></i>
//             <span>Reply</span>
//           </div>
//           <div onClick={() => this.handleClickForward(message)}>
//             <i className="fas fa-share-alt"></i>
//             <span>Forward</span>
//           </div>
//           <div onClick={() => this.handleClickDeleteMessage(message)}>
//             <i className="fas fa-ban"></i>
//             <span>Delete</span>
//           </div>
//           {(isMsgMine && !message.forward_to) && (
//             <div onClick={() => this.handleClickEditMessage(message)}>
//               <i className="fas fa-pen"></i>
//               <span>Edit</span>
//             </div>
//           )}
//         </div>
//       )
//     }
//   }
//
//   handleClickDeleteMessage = (message) => {
//     this.props.openPopup({
//       message: `Do you want to delete message?`,
//       onConfirm: () => this.handleConfirmDeleteMessage(message)
//     });
//   }
//
//   handleConfirmDeleteMessage = async (message) => {
//     const data = await api('delete_message', message);
//     if (data.error) {
//       this.props.openPopup({
//         message: data.error.description,
//       });
//     }
//
//     if (data.deleted) {
//       this.setState({ messageWithFeatures: null })
//       const newMessages = this.props.app.state.messages.filter((m) => m.id !== message.id);
//       this.props.app.setState({ messages: newMessages })
//     }
//   }
//
//   handleClickReply = (message) => {
//     this.setState({
//       messageToReply: message,
//       messageWithFeatures: null
//     })
//   }
//
//   handleClickForward = (message) => {
//     this.props.app.setState({
//       messageToForward: message,
//       messageWithFeatures: null
//     });
//     browserHistory.push('/chats');
//   }
//
//   handleClickButtonSend = async () => {
//     const { currentUser, messages } = this.props.app.state;
//     const { inputMessage, messageToReply } = this.state;
//
//     if (inputMessage && inputMessage.trim()) {
//       const newMessage = {
//         user: currentUser.id,
//         chat: this.getChat().id,
//         content: inputMessage
//       };
//
//       if (messageToReply) {
//         newMessage.reply_to = messageToReply.id;
//       }
//
//       const data = await api('create_message', newMessage);
//
//       if (data.error) {
//         this.props.openPopup({
//           message: data.error.description,
//         });
//       } else {
//         const newMessages = messages.concat(data.message);
//
//         this.props.app.setState({ messages: newMessages })
//         this.setState({
//           inputMessage: '',
//           messageToReply: null,
//         });
//       }
//     }
//   }
//
//   handleClickEditMessage = (message) => {
//     this.setState({
//       messageToEdit: message,
//       inputMessage: message.content,
//       messageWithFeatures: null
//     });
//   }
//
//   handleClickButtonEditOk = async () => {
//     const { inputMessage, messageToEdit } = this.state;
//
//     if (messageToEdit.content === inputMessage) return;
//
//     const data = await api('update_message', {
//       id: messageToEdit.id,
//       content: inputMessage
//     });
//
//     if (data.error) {
//       this.props.openPopup({
//         message: data.error.description,
//       });
//     }
//
//     if (data.message) {
//       this.props.app.updateMessages(data.message);
//       this.setState({ inputMessage: '', messageToEdit: null });
//     }
//   }
//   handleCancelReplying = () => {
//     this.setState({ inputMessage: '', messageToReply: null });
//   }
