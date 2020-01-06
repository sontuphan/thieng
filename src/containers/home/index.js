import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Drain from 'components/drain';
import Welcome from './welcome';
import Mission from './mission';
import Policy from './policy';
import Contact from './contact';

import styles from './styles';

class Header extends Component {
  render() {
    let { classes } = this.props;

    return <Fragment>
      <Drain />
      <Welcome />
      <Drain />
      <Mission />
      <Drain />
      <Policy />
      <Drain />
      <Contact />
    </Fragment >
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header)));