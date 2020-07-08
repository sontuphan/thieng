import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { } from '@material-ui/icons';

import { UserCard, GalleryCard } from 'components/cards';

import styles from './styles';
import utils from 'helpers/utils';

import { setConfirmation } from 'modules/notification.reducer';
import { getOrder } from 'modules/bucket.reducer';


class MyOrder extends Component {
  constructor() {
    super();

    this.state = {
      order: {},
      isLoading: false
    }
  }

  componentDidMount() {
    const { orderId, getOrder, setConfirmation } = this.props;
    return getOrder(orderId).then(re => {
      return this.setState({ order: re });
    }).catch(er => {
      return setConfirmation(true, 'Đã có lỗi xảy ra', 'error');
    });
  }

  renderItems = (items) => {
    if (!items) return null;
    return items.map((item, i) => <Grid item xs={12} md={6} key={i}>
      <GalleryCard itemId={item.itemId} amount={item.amount ? 'x' + item.amount : null} />
    </Grid>)
  }

  render() {
    const { classes } = this.props;
    const { order } = this.state;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container alignItems="center" className={classes.noWrap} spacing={2}>
          <Grid item className={classes.stretch}>
            <UserCard userId={order.sellerId || ''} />
          </Grid>
          <Grid item>
            <Typography>{utils.prettyDatetime(order.createdAt)}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {this.renderItems(order.items)}
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setConfirmation,
  getOrder,
}, dispatch);

MyOrder.propTypes = {
  orderId: PropTypes.string.isRequired,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MyOrder)));