import React from 'react';
import { Navbar, Dropdown } from 'react-bulma-components';
import { Link, browserHistory } from 'react-router';

import { getImg, getFileFormat } from '../helpers';
import noAvatar from '../images/no-avatar.png';

export default class DropdownSettings extends React.Component {
  handleClickLogOut = () => {
    console.log('what');
    this.props.openPopup({
      message: 'Do you want to log out?',
      type: 'confirm',
      callback: () => this.handleLogOut(),
    });
  }

  handleLogOut = () => {
    alert('log out');
    // this.props.app.ws.close();
    // this.props.app.setState({ currentUser: null });
    // localStorage.removeItem('user');
    // browserHistory.push('/login');
  }
  //
  // getAvatar = () => {
  //   if (this.state.avatar && (typeof this.state.avatar === 'object')) {
  //     return window.URL.createObjectURL(this.state.avatar);
  //   }
  //   return getImg(this.state.avatar);
  // }
  //
  // handleSubmit = () => {
  //   this.props.toggleEditProfileMode(false);
  //   this.props.app.handleSubmitUser({
  //     name: this.state.name,
  //     login: this.state.login,
  //     avatar: this.state.avatar,
  //   })
  // }

  render () {
    console.log({dropdown: this.props});
    return (
      <Navbar.Item key={this.props.key}>
        <Dropdown
          closeOnSelect="true"
          align="right"
          label={<i className="fas fa-ellipsis-v"></i>}
        >
          <Dropdown.Item value="edit-profile">
            <div onClick={() => browserHistory.push('/profile')}>Edit profile</div>
          </Dropdown.Item>
          <Dropdown.Item value="log-out">
            <div onClick={this.handleClickLogOut}>Log out</div>
          </Dropdown.Item>
        </Dropdown>
      </Navbar.Item>
    )
  }
}
