import React from 'react';
import { Navbar, Dropdown } from 'react-bulma-components';


export default class DropdownMessages extends React.Component {
  render () {
    return (
      <Navbar.Item key={this.props.key} className="avatar-in-msgs">
        <Dropdown
          closeOnSelect="true"
          align="right"
          label="Avatar"
          // label={<div className="user-avatar-small" style={{ backgroundImage: `url(${getImg(user.avatar)})` }}/>}
        >
          <Dropdown.Item value="to-profile">To profile</Dropdown.Item>
          {/* <Dropdown.Item value="search" onClick={() => this.props.app.setState({ isSearch: true, isMsgMenuActive: false })}> */}
          <Dropdown.Item value="search">
            <span>Search</span>
          </Dropdown.Item>
          <Dropdown.Item value="select">
            <span>Select messages</span>
          </Dropdown.Item>
          {/* <Dropdown.Item value="clear-chat" onClick={() => this.handleClickClearChat()}> */}
          <Dropdown.Item value="clear-chat">
            <span>Clear chat</span>
          </Dropdown.Item>
        </Dropdown>
      </Navbar.Item>
    )
  }
}
