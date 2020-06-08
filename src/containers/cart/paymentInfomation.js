import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import {
  ReceiptRounded,
  LocalAtmRounded, CreditCardRounded, AccountBalanceRounded,
} from '@material-ui/icons';

import Drain from 'components/drain';

import { toogleCart, setCart } from 'modules/cart.reducer';

import styles from './styles';
import utils from 'helpers/utils';


class PaymentInfomation extends Component {
  constructor() {
    super();

    this.state = {
      code: '',
      payment: 'cod',
    }
  }

  onCode = (e) => {
    let code = e.target.value;
    if (!code) code = '';
    this.setState({ code });
  }

  onPayment = (e) => {
    let payment = e.target.value;
    this.setState({ payment });
  }

  getBill = () => {
    const { cart: { data } } = this.props;
    const amount = data.reduce((total, item) => total + item.amount * item.price, 0);
    return `${utils.prettyNumber(amount, 'long')} vnd`;
  }

  render() {
    const { classes } = this.props;
    return <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2} >
          <Grid item>
            <Typography variant="h3">Thanh toán</Typography>
          </Grid>
          <Grid item className={classes.stretch} xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
          <Grid item className={classes.icon}>
            <ReceiptRounded fontSize="small" color="primary" />
          </Grid>
          <Grid item>
            <Typography>Tổng</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="h3">{this.getBill()}</Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Promotion code */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Mã giảm giá"
          color="secondary"
          variant="outlined"
          value={this.state.code}
          onChange={this.onCode}
          multiline
          fullWidth
        />
      </Grid>
      {/* Payment */}
      <Grid item xs={12} sm={6} md={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel color="secondary">Phương thức thanh toán</InputLabel>
          <Select
            label="Phương thức thanh toán"
            color="secondary"
            value={this.state.payment}
            onChange={this.onPayment}
            classes={{ root: classes.selectIcon }}
          >
            <MenuItem value={'cod'}>
              <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                <Grid item className={classes.icon}>
                  <LocalAtmRounded fontSize="small" />
                </Grid>
                <Grid item className={classes.stretch}>
                  <Typography>Giao hàng nhận tiền (COD)</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <MenuItem value={'credit'}>
              <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                <Grid item className={classes.icon}>
                  <CreditCardRounded fontSize="small" />
                </Grid>
                <Grid item className={classes.stretch}>
                  <Typography>Thẻ ghi nợ (Credit)</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <MenuItem value={'bank'}>
              <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                <Grid item className={classes.icon}>
                  <AccountBalanceRounded fontSize="small" />
                </Grid>
                <Grid item className={classes.stretch}>
                  <Typography>Thẻ ngân hàng</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toogleCart,
  setCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PaymentInfomation)));