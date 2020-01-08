import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';
import Carousel from 'components/carousel';

import styles from './styles';

class Policy extends Component {
  render() {
    return <Fragment>
      <Grid item xs={12} md={6}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">Chính sách</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis vel consectetur amet, felis. Ullamcorper est lectus faucibus augue feugiat maecenas sed id. Ornare sit egestas eget luctus aenean malesuada a. Feugiat gravida aenean quam ante purus erat interdum orci. Et vel ut sit ut tristique. In vel fusce suspendisse sit enim aliquam.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet turpis sed gravida amet. Luctus sed parturient lacus vestibulum nisl neque. Vehicula risus tellus viverra cursus et. Porta arcu tincidunt enim ut platea in amet, at. Aliquet risus sem arcu pretium rutrum. Sit enim nec viverra sapien semper imperdiet. A cursus.</Typography>
          </Grid>
          <Drain />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Carousel
          title="Top 10"
          subtitle="Sản phẩm"
          pagination={{ page: 2, total: 10 }}
        />
        <Drain />
      </Grid>
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
)(withStyles(styles)(Policy)));