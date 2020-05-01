import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Static component
import Drain from 'components/drain';
import Header from 'containers/header';
import Footer from 'containers/footer';
// Pages
import Home from 'containers/home';
import Newsfeed from 'containers/newsfeed';
import Mall from 'containers/mall';
import User from 'containers/user';
// Apllications
import Search from 'containers/search';
import Cart from 'containers/cart';
import Notification from 'containers/notification';
// Debug
import Debug from 'containers/debug';

import theme from 'static/styles/theme';
import 'static/styles/index.css';

import { setScreen } from 'modules/ui.reducer';

class App extends Component {
  constructor(props) {
    super(props);

    props.setScreen(window.innerWidth);
  }

  componentDidMount() {
    window.onresize = () => {
      this.props.setScreen(window.innerWidth);
    }
  }

  render() {
    return <ThemeProvider theme={theme}>
      <Grid container justify="center" spacing={2}>
        {/* Header */}
        <Grid item xs={11} md={10}>
          <Header />
        </Grid>
        {/* Pages */}
        <Grid item xs={12}>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            <Redirect exact path="/newsfeed" to="/newsfeed/for-me" />
            <Route exact path="/newsfeed/:page" component={Newsfeed} />
            <Route path="/mall" component={Mall} />
            <Redirect exact from="/user/:userId" to="/user/:userId/home" />
            <Route exact path="/user/:userId/:page" component={User} />
            <Route exact path="/debug" component={Debug} />
          </Switch>
        </Grid>
        {/* Global app */}
        <Grid item xs={12}>
          <Search />
          <Cart />
          <Notification />
        </Grid>
        {/* Safe zone */}
        <Grid item xs={12}>
          <Drain large />
        </Grid>
        {/* Footer */}
        <Grid item xs={11} md={10}>
          <Footer />
        </Grid>
      </Grid>
    </ThemeProvider>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setScreen,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles({})(App)));
