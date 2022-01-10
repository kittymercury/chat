import React from 'react';
import { Container, Form, Section, Heading, Icon } from 'react-bulma-components';

// import './styles.scss';

export default class ShowPasswordCheckbox extends React.Component {
  render () {
    return (
      <Form.Field>
        <Form.Control>
          <Form.Checkbox onChange={this.props.onChangeShowPassword}
          checked={this.props.isPasswordVisible}>
            Show password
          </Form.Checkbox>
        </Form.Control>
      </Form.Field>
    )
  }
}
