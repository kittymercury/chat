import React from 'react';

// import './styles.scss';

export default class Languages extends React.Component {
  // handleSelectTheme = (id) => {
  //   this.props.app.setState({ theme: id });
  //
  //   var htmlElement = document.getElementsByTagName("html")[0];
  //   htmlElement.classList.remove(...htmlElement.classList);
  //   htmlElement.classList.add(`${id}`);
  // }
  //
  // renderCheck = (state, prop) => {
  //   if (state === prop) {
  //     return <i className="fas fa-check"></i>
  //   }
  // }

  render() {
    return (
      <div className={`change-language ${this.props.activeMenuItem === 'change-language' ? 'active' : ''}`}>
        <div className="headline" onClick={() => this.props.onClick('change-language')}>
          <span>Themes</span>
          <i className="fas fa-angle-down"></i>
        </div>
        <div className="language">
          <span>English (default)</span>
        </div>
        <div className="language">
          <span>Russian</span>
        </div>
        <div className="language">
          <span>Ukrainian</span>
        </div>
      </div>
    )
  }
}
