import React from 'react';
import { lock, unlock } from 'tua-body-scroll-lock';

import './styles.scss';

export default class InputSearch extends React.Component {
  componentDidMount = () => {
    const searchWrapper = document.querySelector('.search-wrapper');
    lock(searchWrapper);
  }

  render () {
    const { value, visible, changeSearchValue, closeSearch } = this.props;
    console.log({searh: this.props});
    if (!visible) return null;

    return (
      <div className="search-wrapper">
        <div>
          <i className="fas fa-search"></i>
          <input
            autoFocus
            className="search"
            type="text"
            placeholder="Search"
            value={value}
            onChange={(e) => changeSearchValue(e.target.value)}
          />
        </div>
        <div className="cancel-searching" onClick={closeSearch}>Cancel</div>
      </div>
    )
  }
}
