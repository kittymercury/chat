import React from 'react';
import { lock, unlock } from 'tua-body-scroll-lock';
import { Navbar, Form, Heading, Icon, Button, Block } from 'react-bulma-components';

import './styles.scss';

export default class InputSearch extends React.Component {
  componentDidMount = () => {
    const searchWrapper = document.querySelector('.search-wrapper');
    lock(searchWrapper);
  }

  render () {
    const { value, visible } = this.props.search;
    if (!visible) return null;

    return (
      <Navbar className="search-wrapper">
        <Form.Field>
          <Form.Control>
            <Form.Input
              autoFocus
              className="search"
              type="text"
              placeholder="Search"
              value={value}
              onChange={(e) => this.props.changeSearchValue(e.target.value)}
            />
            <Icon align="left" size="small">
              <i className="fas fa-search"></i>
            </Icon>
          </Form.Control>
          <div className="cancel-searching" onClick={this.props.closeSearch}>Cancel</div>
        </Form.Field>
      </Navbar>
    )
  }
}
