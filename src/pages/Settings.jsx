import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  render() {
    return (
      <h1 data-testid="settings-title">Configurações</h1>
    );
  }
}

export default connect()(Settings);
