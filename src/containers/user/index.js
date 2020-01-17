import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { ArrowForwardIos } from '@material-ui/icons';

import Drain from 'components/drain';
import MiniShowcase from 'components/minishowcase';
import Divider from 'components/divider';
import Card from 'components/card';

import utils from 'helpers/utils';

import styles from './styles';
import human1 from 'static/images/human-1.svg';
import human2 from 'static/images/human-2.svg';
import human3 from 'static/images/human-3.svg';
import human4 from 'static/images/human-4.svg';
import human5 from 'static/images/human-5.svg';

class User extends Component {
  constructor() {
    super();

    this.state = {
      recommendation: [0, 1, 2, 3, 4, 5],
      likes: '12.853',
      products: 32,
      data: utils.dummy()[1],
      menu: [
        {
          title: "Xưởng thiết kế",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          color: "linear-gradient(71.34deg, #9B51E0 0%, #BB6BD9 100%)",
          img: human1
        },
        {
          title: "Kệ hàng",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          color: "linear-gradient(71.34deg, #2D9CDB 0%, #56CCF2 100%)",
          img: human2
        },
        {
          title: "Khách hàng",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          color: "linear-gradient(71.34deg, #27AE60 0%, #6FCF97 100%)",
          img: human3
        },
        {
          title: "Ví",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          color: "linear-gradient(71.34deg, #F2994A 0%, #F2C94C 100%)",
          img: human4
        },
        {
          title: "Cài đặt",
          subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          color: "linear-gradient(71.34deg, #DB2721 0%, #FF3E3C 100%)",
          img: human5
        }
      ]
    }
  }

  onMore = () => {
    let recommendation = JSON.parse(JSON.stringify(this.state.recommendation));
    let last = recommendation[recommendation.length - 1];
    for (let i = 0; i < 6; i++) {
      recommendation.push(last + i + 1);
    }
    this.setState({ recommendation });
  }

  render() {
    let { classes } = this.props;
    let { data, recommendation } = this.state;

    return <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={10} md={5}>
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar alt={data.author.displayname} src={data.author.avatar} className={classes.avatar} />
          </Grid>
          <Grid item>
            <Typography variant="h1">{data.author.displayname}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} md={5}>
        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            <Typography>{this.state.likes} Thích - {this.state.products} Sản phẩm</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" justify="center" spacing={2}>
          {
            this.state.menu.map(
              (card, i) => <Grid key={i} item xs={10} md={2}>
                <Card {...card} width={this.props.ui.width} />
              </Grid>
            )
          }
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">Sản phẩm</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
          {recommendation.map(i => <Grid key={i} item xs={6} md={2}>
            <MiniShowcase object={data} />
          </Grid>)}
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" spacing={2}>
              <Grid item>
                <Button variant="outlined" color="primary" size="large" endIcon={<ArrowForwardIos />} onClick={this.onMore}>
                  <Typography>Nhiều hơn</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User)));