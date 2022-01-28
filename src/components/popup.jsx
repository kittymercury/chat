import React from 'react';
import { Modal, Button } from 'react-bulma-components';

import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .modal-close {
    display: none;
  }

  .modal-card {
    max-width: 70%;
    border-radius: 10px;
    z-index: 100;

    section.modal-card-body {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      padding: 1rem 0.5rem;
      flex-grow: 0;
    }

    footer.modal-card-foot {
      justify-content: space-evenly;
      padding: 0.7rem;

      button.button {
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }
`;

export default class PopUp extends React.Component {
  handleClickConfirm = () => {
    this.props.popup.callback();
    this.props.closePopup();
  }

  renderPlainPopup = () => {
    if (!this.props.popup.type) {
      return (
        <Modal.Card>
          <Modal.Card.Body>{this.props.popup.message}</Modal.Card.Body>
          <Modal.Card.Footer>
            <Button onClick={() => this.props.closePopup()}>Ok</Button>
          </Modal.Card.Footer>
        </Modal.Card>
      )
    }
  }

  renderConfirmPopup = () => {
    if (this.props.popup.type === 'confirm') {
      return (
        <Modal.Card>
          <Modal.Card.Body>{this.props.popup.message}</Modal.Card.Body>
          <Modal.Card.Footer>
            <Button color="primary" onClick={this.handleClickConfirm}>Yes</Button>
            <Button color="danger" onClick={this.props.closePopup}>Cancel</Button>
          </Modal.Card.Footer>
        </Modal.Card>
      )
    }
  }

  render () {
    if (!this.props.popup.visible) return null;

    return (
      <StyledModal renderAs="div" isActive={this.props.visible} show="true">
        {this.renderPlainPopup()}
        {this.renderConfirmPopup()}
      </StyledModal>
    )
  }
}
