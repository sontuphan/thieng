import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Drain from 'components/drain';
import Creation from './creation';
import Selling from './selling';
import Archive from './archive';


class UserStore extends Component {

  render() {
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Creation />
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12}>
        <Selling />
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12}>
        <Archive />
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
    </Grid>

  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserStore));