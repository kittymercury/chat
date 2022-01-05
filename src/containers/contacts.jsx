import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContactsComponent from '../components/contacts';
import * as ActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return { users: state.users }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openContactInfo: bindActionCreators(ActionCreators.openContactInfo, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(ContactsComponent);
