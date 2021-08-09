import React from 'react';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';
import noAvatar from '../tg-imgs/no-avatar.png';

export default class SettingsEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.user.name,
      avatar: props.user.avatar,
    }
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value })
  }

  handleClickChangeName = () => {
    this.props.onSubmitUser({ name: this.state.name });
  }

  handleClickRemoveAvatar = () => {
    this.props.onSubmitUser({ avatar: '' });
  }

  handleClickAvatarSubmit = () => {
    this.props.onSubmitUser({ avatar: this.state.avatar });
  }

  render () {

    return (
      <div className="edit-profile content">
        <div className="change-name">
          <h4>Change name</h4>
          <input
            className="name-input"
            type="text"
            value={this.state.name}
            onChange={this.handleChangeName}
          />
          <button className="submit" onClick={this.handleClickChangeName}>Submit</button>
        </div>

        <div className="change-avatar">
          <h4>Change avatar</h4>
          <div>
            <button className="remove-avatar" onClick={this.handleClickRemoveAvatar}>Remove avatar</button>
          </div>
          <div>
            <input
              type="file"
              name="avatar"
              accept="image/png, image/jpeg, image/jpg"
              onChange={this.handleChangeAvatar}
            />
            <p>
              <button onClick={this.handleClickAvatarSubmit}>Submit</button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
