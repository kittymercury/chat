import React from 'react';
import { Dropdown, Icon } from 'react-bulma-components';

import './styles.scss';

export default class Themes extends React.Component {
  handleSelectTheme = (id) => {
    this.props.app.setState({ theme: id });

    var htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList.remove(...htmlElement.classList);
    htmlElement.classList.add(`${id}`);
  }

  renderCheck = (state, prop) => {
    if (state === prop) {
      return <i className="fas fa-check"></i>
    }
  }

  render() {
    return (
      <Dropdown closeOnSelect={false} icon={<Icon><i aria-hidden="true" className="fas fa-angle-down"/></Icon>} label="Themes" active={this.props.activeMenuItem === 'change-theme' ? 'true' : 'false'}>
        <Dropdown.Item value="dark">Dark</Dropdown.Item>
        <Dropdown.Divider></Dropdown.Divider>
        <Dropdown.Item value="purple">Purple</Dropdown.Item>
      </Dropdown>
    )
  }
}
