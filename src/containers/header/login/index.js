import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { CloseRounded, RoomServiceRounded } from '@material-ui/icons';
import { FaGoogle, FaFacebookF, FaApple, FaTwitter } from 'react-icons/fa';

import styles from './styles';
import configs from 'configs';

class LogIn extends Component {
  constructor() {
    super();

    this.state = {
      error: null
    }
  }

  logIn = (data) => {
    if (data.googleId) {
      this.setState({ error: null });
      this.props.onToggle();
      let user = {
        service: 'google',
        accessToken: data.tokenId,
        email: data.profileObj.email,
        displayname: data.profileObj.name,
        avatar: data.profileObj.imageUrl,
      }
      return this.props.callback(null, user);
    }
    else if (data.graphDomain === 'facebook') {
      this.setState({ error: null });
      this.props.onToggle();
      let user = {
        service: 'facebook',
        accessToken: data.accessToken,
        email: data.email,
        displayname: data.name,
        avatar: data.picture.data.url,
      }
      return this.props.callback(null, user);
    } else {
      this.setState({ error: 'Some errors have occured. Please try again!' });
      return this.props.callback('Login errors.', null);
    }
  }

  render() {
    let { classes } = this.props;
    let { visible, onToggle } = this.props;

    return <Dialog open={visible} onClose={onToggle} >
      <DialogTitle>
        <Grid container spacing={2} alignItems="center" className={classes.noWrap}>
          <Grid item className={classes.stretch}>
            <Typography variant="h3">Đăng nhập</Typography>
          </Grid>
          <Grid item>
            <IconButton color="secondary" size="small" onClick={onToggle}>
              <CloseRounded />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>You can easily log in to the website with your favourite service and skip the inconvenience of registration.</Typography>
          </Grid>
          <Grid item xs={12}>
            {this.state.error ? <Typography color="primary">{this.state.error}</Typography> : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <GoogleLogin
              clientId={configs.auth.google.clientId}
              render={props => <Button
                variant="outlined"
                size="large"
                startIcon={<FaGoogle />}
                onClick={props.onClick}
                disabled={props.disabled}
                fullWidth>
                <Typography>Continue with Google</Typography>
              </Button>}
              onSuccess={this.logIn}
              onFailure={this.logIn}
              cookiePolicy={'single_host_origin'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FacebookLogin
              appId={configs.auth.facebook.appId}
              fields='name,email,picture'
              render={props => <Button
                variant="outlined"
                size="large"
                startIcon={<FaFacebookF />}
                onClick={props.onClick}
                fullWidth>
                <Typography>Continue with Facebook</Typography>
              </Button>}
              callback={this.logIn} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<FaApple />}
              onClick={() => { }}
              fullWidth
              disabled>
              <Typography>Continue with Apple</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<FaTwitter />}
              onClick={() => { }}
              fullWidth
              disabled>
              <Typography>Continue with Twitter</Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container className={classes.action} spacing={2}>
          <Grid item>
            <Button
              color="primary"
              onClick={onToggle}
              startIcon={<RoomServiceRounded />}
            >
              <Typography>Need help?</Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  }
}

export default withStyles(styles)(LogIn);