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
        <Grid item xs={11} md={10}>
          <Header />
        </Grid>
        <Grid item xs={12}>

          {/* Pages */}
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            <Redirect exact path="/newsfeed" to="/newsfeed/for-me" />
            <Route exact path="/newsfeed/:page" component={Newsfeed} />
            <Route path="/mall" component={Mall} />
            <Redirect exact from="/user/:email" to="/user/:email/home" />
            <Route exact path="/user/:email/:page" component={User} />
          </Switch>

          {/* Global app */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Search />
            </Grid>
            <Grid item xs={12}>
              <Cart />
            </Grid>
            <Grid item xs={12}>
              <Notification />
            </Grid>
          </Grid>

        </Grid>
        <Grid item xs={12}>
          <Drain large />
        </Grid>
        <Grid item xs={10}>
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
