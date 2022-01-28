import React from 'react';
import { browserHistory } from 'react-router';
import { Container, Notification } from 'react-bulma-components';
import lodash from 'lodash';

import api from '../../api';
import { getImg } from '../../helpers';
import './styles.scss';

export default class Contacts extends React.Component {
  handleClickContact = (user) => {
    this.props.closeSearch();
    browserHistory.push(`/contact-info/${user.id}`);
  }

  renderStatus = (user = {}) => {
    if (this.props.settings.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status || 'offline'}`}></i>
    }
  }

  renderIsUserInContactList = (user) => {
    const currentUser = this.props.currentUser;
    if (!currentUser.contacts.includes(user.id)) return;
    return <i className="fas fa-user-friends"></i>
  }

  renderNotification = (users) => {
    const { search } = this.props;
    if (!search.visible || !search.value) return null;
    if (search.value && users.length) return null;
    return (
      <Notification>
        <div>No users with such login</div>
      </Notification>
    )
  }

  render () {
    const { currentUser, search, foundUser, records } = this.props;
    const contacts = records.users.filter((user) => {
      return currentUser.contacts.includes(user.id);
    });

    let users = [];
    if (!search.visible) {
      users = contacts
    };

    if (search.visible && !search.value) {
      const knownUsers = _.uniq([ ...contacts, ...records.users], 'id');
      users = knownUsers;
    }

    if (search.value) {
      records.users.forEach((user) => {
        if (user.name.toLowerCase().includes(search.value.toLowerCase()) || user.login.toLowerCase().includes(search.value.toLowerCase())) {
          users.push(user)
        }
      })

      if (foundUser) {
        const isUserKnown = records.users.some((user) => user.id === foundUser.id);
        if (!isUserKnown) {
          users.unshift(foundUser)
        } else {
          users = users;
        }
      }
    }

    const filteredUsers = users.filter((user) => user.id !== currentUser.id);

    return (
        <Container
          className="contacts"
          fullhd={{ display: 'contents' }}
          breakpoint="fullhd"
        >
          {this.renderNotification(filteredUsers)}
          <ul>
            {filteredUsers.map((user) => {
              return (
                <li key={user.id} onClick={() => this.handleClickContact(user)}>
                  <div className="avatar" style={{ backgroundImage: `url(${getImg(user.avatar)})` }}></div>
                  <div className="contact-data">
                    <div>
                      <span>{user.name}</span>
                      {this.renderStatus(user)}
                      {this.renderIsUserInContactList(user)}
                    </div>
                    <div>@{user.login}</div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
    )
  }
}
