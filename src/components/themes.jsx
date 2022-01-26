import React from 'react';
import { Dropdown, Icon } from 'react-bulma-components';

export default class Themes extends React.Component {
  handleSelectTheme = (theme) => {
    this.props.changeTheme(theme);
  }

  render() {
    return (
      <Dropdown
        className="themes"
        closeOnSelect={false}
        icon={<Icon><i className="fas fa-angle-down"/></Icon>}
        label="Themes"
      >
        <Dropdown.Item value="dark">
          <div onClick={() => this.handleSelectTheme('dark')}>Dark</div>
        </Dropdown.Item>
        <Dropdown.Divider></Dropdown.Divider>
        <Dropdown.Item value="light">
          <div onClick={() => this.handleSelectTheme('light')}>Light</div>
        </Dropdown.Item>
        <Dropdown.Divider></Dropdown.Divider>
        <Dropdown.Item value="purple">
          <div onClick={() => this.handleSelectTheme('purple')}>Purple</div>
        </Dropdown.Item>
      </Dropdown>
    )
  }
}
