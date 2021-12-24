import React from 'react';

import './styles.scss';

export default class PopUp extends React.Component {
  handleClickConfirm = () => {
    this.props.callback();
    this.props.closePopup();
  }

  renderPlainPopup = () => {
    if (!this.props.type) {
      return (
        <div>
          <div className="pop-up-content">{this.props.message}</div>
          <div className="popup-btns">
            <div className="button-ok" onClick={this.props.closePopup}>Ok</div>
          </div>
        </div>
      )
    }
  }

  renderConfirmPopup = () => {
    if (this.props.type === 'confirm') {
      return (
        <div>
          <div className="pop-up-content">{this.props.message}</div>
          <div className="popup-btns">
            <div className="button-ok" onClick={this.handleClickConfirm}>Yes</div>
            <div className="button-no" onClick={this.props.closePopup}>Cancel</div>
          </div>
        </div>
      )
    }
  }

  render () {
    if (!this.props.visible) return null;

    return (
      <div className="pop-up-wrapper">
        <div className="pop-up">
          {this.renderPlainPopup()}
          {this.renderConfirmPopup()}
        </div>
      </div>
    )
  }
}
