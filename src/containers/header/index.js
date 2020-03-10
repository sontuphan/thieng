import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';

import { Menu, Person, Close, Notifications } from '@material-ui/icons';

import styles from './styles';
import LogIn from './login';
import SearchToolbar from './search';

import utils from 'helpers/utils';
import { search } from 'modules/search.reducer';
import { refreshSession, logIn, logOut } from 'modules/auth.reducer';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: props.ui.width >= 960,
      user: {},
      routes: [
        { text: "Bảng tin", link: '/newsfeed' },
        { text: "Siêu thị", link: '/mall' },
        // { text: "Đối tác", link: '/partner' },
        { text: "Liên hệ", link: '/home#contact' },
      ],
      grocery: 3,
      visibleDrawer: false,
      visibleLogInModal: false,
    }

    this.logo = <Typography variant="h3">Thiêng</Typography>
  }

  componentDidMount() {
    this.props.refreshSession();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.auth) !== JSON.stringify(this.props.auth)) {
      this.setState({ user: this.props.auth });
    }
    if (JSON.stringify(prevProps.ui) !== JSON.stringify(this.props.ui)) {
      this.setState({ matches: this.props.ui.width >= 960 })
    }
  }

  search = (data) => {
    this.props.search(data).then(re => {
      this.setState({ visibleDrawer: false });
    }).catch(er => {
      console.error(er);
    });
  }

  onToggleDrawer = (visible) => {
    if (typeof visible === 'boolean') return this.setState({ visibleDrawer: visible });
    return this.setState({ visibleDrawer: !this.state.visibleDrawer });
  }

  onToggleLogInModal = (visible) => {
    if (typeof visible === 'boolean') return this.setState({ visibleLogInModal: visible });
    this.setState({ visibleLogInModal: !this.state.visibleLogInModal });
  }

  logIn = (er, re) => {
    if (er) return console.error(er);
    return this.props.logIn(re);
  }

  renderProfile = () => {
    let { user } = this.state;
    if (user.isValid)
      return <ButtonGroup>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Badge badgeContent={this.state.grocery} color="primary">
            <Notifications fontSize="small" />
          </Badge>}
          onClick={() => this.onToggleDrawer(false)}>
          <Typography>Thông báo</Typography>
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Person />}
          component={RouterLink}
          to="/user/remy-sharp"
          onClick={() => this.onToggleDrawer(false)}>
          <Typography>{user.displayname}</Typography>
        </Button >
        <Button
          variant="outlined"
          size="small"
          onClick={this.props.logOut}>
          <Typography>Đăng xuất</Typography>
        </Button>
      </ButtonGroup >
    else
      return <Button
        variant="outlined"
        size="small"
        onClick={this.onToggleLogInModal}>
        <Typography>Đăng nhập</Typography>
      </Button >
  }

  renderDrawer = () => {
    let { classes } = this.props;
    return <Drawer anchor="top" open={this.state.visibleDrawer} onClose={this.onToggleDrawer}>
      <List className={classes.drawer}>
        <ListItem>
          <ListItemText primary={utils.greet()} />
          <ListItemSecondaryAction>
            <IconButton color="secondary" size="small" onClick={this.onToggleDrawer}>
              <Close />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem button component={RouterLink} to="/home" onClick={this.onToggleDrawer} >
          <ListItemText primary={this.logo} />
        </ListItem>
        {
          this.state.routes.map((route, index) => <ListItem
            key={index}
            button
            component={RouterLink}
            to={route.link}
            onClick={this.onToggleDrawer} >
            <ListItemText primary={route.text} />
          </ListItem>)
        }
        <Divider />
        <ListItem>
          <SearchToolbar onChange={this.search} fullWidth={!this.state.matches} />
        </ListItem>
        <ListItem>
          {this.renderProfile()}
        </ListItem>
      </List>
    </Drawer>
  }

  renderRoute = () => {
    let { classes } = this.props;
    if (this.state.matches)
      return <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
        <Grid item className={classes.route}>
          <SearchToolbar onChange={this.search} fullWidth={!this.state.matches} />
        </Grid>
        {
          this.state.routes.map((route, index) =>
            <Grid item key={index} className={classes.route}>
              <Link color="textPrimary" underline="none" component={RouterLink} to={route.link}>
                <Typography >
                  <span className="link">{route.text}</span>
                </Typography>
              </Link>
            </Grid>
          )
        }
        <Grid item className={classes.route}>
          {this.renderProfile()}
        </Grid>
      </Grid>
    else
      return <Grid container direction="row" justify="flex-end" alignItems="center">
        <IconButton color="secondary" onClick={this.onToggleDrawer}>
          <Badge badgeContent={this.state.grocery} color="primary">
            <Menu />
          </Badge>
        </IconButton>
      </Grid>
  }

  render() {
    let { classes } = this.props;

    return <Fragment>
      <Grid item xs={10}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item className={classes.logo}>
            <Link color="textPrimary" underline="none" component={RouterLink} to={'/home'}>
              {this.logo}
            </Link>
          </Grid>
          <Grid item>
            {this.renderRoute()}
          </Grid>
        </Grid>
      </Grid>
      {this.renderDrawer()}
      <LogIn
        visible={this.state.visibleLogInModal}
        onToggle={this.onToggleLogInModal}
        callback={this.logIn}
        fullWidth={!this.state.matches}
      />
    </Fragment>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
  refreshSession, logIn, logOut,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header)));