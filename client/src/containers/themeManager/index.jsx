import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Container from './container';

class ThemeManager extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { theme, children } = this.props;

    return (
      <Container theme={theme} id="root" className="theme-manager">
        {children}
      </Container>
    );
  }
}


// import * as CommonActionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  const themes = state.records.themes;
  const theme = themes.find((th) => th.name === state.settings.theme);

  return {
    theme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // createRecords: bindActionCreators(RecordsActionCreators.createRecords, dispatch),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(ThemeManager);
