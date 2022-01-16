import React from 'react';
import { browserHistory } from 'react-router';
import { Navbar, Heading, Icon } from 'react-bulma-components';

import { getImg } from '../../helpers';
import { DELETED_USERNAME } from '../../constants';
import './styles.scss';

export default class Header extends React.Component {
  componentDidMount = () => {
    // const header = document.querySelector('.header');
    // this.props.app.disableScroll(header);
    // const currentPage = this.props.app.getPage();
    // console.log({page: currentPage, headerVisible: this.props.visible});

    // this.props.changeHeaderVisibility({ page: currentPage });
  }

  componentDidUpdate = () => {
    // const header = document.querySelector('.header');
    // this.props.app.disableScroll(header);
    // const currentPage = this.props.app.getPage();
    //
    // this.props.changeHeaderVisibility({ page: currentPage });
  }

  handleClickSearch = () => {
    const currentPage = this.props.app.getPage();

    this.props.openSearch({ page: currentPage });
  }

  handleCancelForwarding = () => {
    const { messageToForward, selectedMessages } = this.props.app.state;

    if (messageToForward) {
      this.props.app.setState({ messageToForward: null });
    }

    if (selectedMessages) {
      browserHistory.goBack();
    }
  }

  handleClickMsgMenu = () => {
    this.props.app.setState({
      isMsgMenuActive: this.props.app.state.isMsgMenuActive
        ? false
        : true
    });
  }

  renderButtonsLeft = () => {
    const {
      messageToForward,
      isMsgMenuActive
    } = this.props.app.state;

    const currentPage = this.props.app.getPage();

    if (['chats', 'contacts'].includes(currentPage)) {
      return (
        <Navbar.Item className="search" onClick={this.handleClickSearch}>
          <i className="fas fa-search"></i>
        </Navbar.Item>
      )
    }
  }

  // renderMessagesHeader = () => {
  //   const currentPage = this.props.app.getPage();
  //   const { isSelectMode, isMsgMenuActive, currentUser, users = [], chats = [] } = this.props.app.state;
  //   if (isSelectMode) return null;
  //   if (!chats) return null;
  //   const currentChat = +window.location.pathname.split('/')[2];
  //   if (!currentChat) return null;
  //   const chat = chats.find((c) => c.id === currentChat);
  //   if (!chat) return null;
  //   const participant = chat.participants.find((id) => id !== currentUser.id);
  //   const user = users.find((u) => u.id === participant) || {};
  //
  //   return (
  //     <Navbar renderAs="nav" fixed="top">
  //       <Navbar.Item onClick={() => this.props.app.setState({ isMsgMenuActive: isMsgMenuActive ? false : true })}>
  //         <i className="fas fa-ellipsis-v"></i>
  //       </Navbar.Item>
  //       <Navbar.Item>
  //         <span>{user.name || DELETED_USERNAME}</span>
  //         <span className="status">{user.status}</span>
  //       </Navbar.Item>
  //       <Navbar.Item>
  //         <div className="user-avatar-small" style={{ backgroundImage: `url(${getImg(user.avatar)})` }} onClick={() => this.handleClickAvatar(user.id)}></div>
  //       </Navbar.Item>
  //       <button className="msg-menu-button" onClick={() => this.props.app.setState({ isMsgMenuActive: isMsgMenuActive ? false : true })}>
  //         <i className="fas fa-ellipsis-v"></i>
  //       </button>
  //       <div className="title">
  //         <div className="user-data-header">
  //           <span>{user.name || DELETED_USERNAME}</span>
  //           <span className="status">{user.status}</span>
  //         </div>
  //       </div>
  //       <div className="user-avatar-small" style={{ backgroundImage: `url(${getImg(user.avatar)})` }} onClick={() => this.handleClickAvatar(user.id)}></div>
  //     </Navbar>
  //   )
  // }

  // renderChatHeaderWithMessagesToForward = () => {
  //   const { isSelectMode, messageToForward, selectedMessages } = this.props.app.state;
  //
  //   if (messageToForward || isSelectMode) {
  //     return (
  //       <div className="header-info-wrapper">
  //         <button style={{ color: 'transparent', cursor: 'initial' }} onClick={this.handleCancelForwarding}>Cancel</button>
  //         {messageToForward && (
  //           <div className="forwarded-messages-amount">Forward 1 message</div>
  //         )}
  //         {isSelectMode && (
  //           <div className="forwarded-messages-amount">Forward {selectedMessages.length} {selectedMessages.length > 1 ? 'messages' : 'message'}</div>
  //         )}
  //         <button onClick={this.handleCancelForwarding}>Cancel</button>
  //       </div>
  //     )
  //   }
  // }

  renderTitle = () => {
    const currentPage = this.props.app.getPage();
    const titleByPathname = {
      'chats': 'Chats',
      'contacts': 'Contacts'
    }
    const title = titleByPathname[currentPage];

    return (
      <Navbar.Item className="page-title" fullhd={{ display: 'flex', alignItems: 'center' }}>
        {Object.keys(titleByPathname).includes(currentPage) && (
          <Heading size="4">{title}</Heading>
        )}
      </Navbar.Item>
    )
  }

  render() {
    // const currentPage = this.props.app.getPage();
    // const currentPage = window.location.pathname;
    // if (!this.props.visible) return null;
    // if (currentPage.includes('messages')) {
    //   return this.renderMessagesHeader()
    // }

    return (
      <Navbar className="header" renderAs="nav" style={{ top: 0 }}>
        {this.renderButtonsLeft()}
        {this.renderTitle()}
      </Navbar>
    )
  }

  // render() {
  //   console.log({header: this.props});
  //   // if (!this.props.visible) return null;
  //
  //   const { isSelectMode, messageToForward } = this.props.app.state;
  //   const currentPage = this.props.app.getPage();
  //   if (currentPage === 'settings') return null;
  //   if (currentPage === 'authentication') return null;
  //   if (messageToForward || isSelectMode && currentPage === 'chats') {
  //     return this.renderChatHeaderWithMessagesToForward()
  //   };
  //
  //   if (!isSelectMode) {
  //     if (currentPage.includes('contact-info')) return null;
  //
  //     if (currentPage.includes('messages')) {
  //       return this.renderMessagesHeader()
  //     } else {
  //       return (
  //         <Navbar renderAs="nav" fixed="top">
  //           <Navbar.Brand>
  //             {this.renderButtonsLeft()}
  //             {this.renderTitle()}
  //           </Navbar.Brand>
  //         </Navbar>
  //       )
  //     }
  //   }
  // }
}
