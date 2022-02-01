import React from 'react';
import { lock, unlock } from 'tua-body-scroll-lock';
import { Navbar, Form, Heading, Icon, Button, Block } from 'react-bulma-components';

import api from '../../api';
import './styles.scss';

export default class InputSearch extends React.Component {
  componentDidMount = () => {
    const searchWrapper = document.querySelector('.search-wrapper');
    lock(searchWrapper);
  }

  handleChangeSearch = async (e) => {
    this.props.changeSearchValue(e.target.value);
    const page = this.props.location.pathname.split('/')[1];

    if (page === 'contacts') {
      const data = await api('get_users', { login: e.target.value });
      this.props.searchUsers(data);
    }
  }

  render () {
    const { value, visible, placeholder } = this.props.search;
    if (!visible) return null;

    return (
      <Navbar className="search-wrapper">
        <Form.Field>
          <Form.Control>
            <Form.Input
              autoFocus
              className="search"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={this.handleChangeSearch}
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
