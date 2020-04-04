import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { Favorite, LocalFlorist, LocalGroceryStore, Visibility, Message } from '@material-ui/icons';

import Divider from 'components/divider';

import styles from './styles';

class Portrait extends Component {
  constructor() {
    super();

    this.state = {
      animation: null
    }
  }

  renderIcon = (type) => {
    switch (type) {
      case 'like':
        return <Favorite fontSize="small" />;
      case 'flower':
        return <LocalFlorist fontSize="small" />;
      case 'product':
        return <LocalGroceryStore fontSize="small" />;
      default:
        return null;
    }
  }

  renderContent = (content) => {
    return content.map((item, i) => <Fragment key={i}>
      <Grid item xs={8}>
        <Grid container direction="row" justify="flex-start" spacing={1}>
          <Grid item>
            {this.renderIcon(item.icon)}
          </Grid>
          <Grid item>
            <Typography>{item.key}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container direction="row" justify="flex-end" spacing={1}>
          <Typography>{item.value}</Typography>
        </Grid>
      </Grid>
    </Fragment>);
  }

  render() {
    let { classes, obj } = this.props;

    return <Grid item key={i} className={classes.slide}>
      <Card className={classes.card}>
        <CardMedia image={obj.avatar} className={classes.cardMedia} />
        <CardHeader className={classes.cardHeader}
          title={<Typography style={{ color: "#FFF" }}>{obj.displayname}</Typography>}
          disableTypography
        />
        <CardContent className={classes.cardContent}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            {this.renderContent(obj.content)}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                <IconButton color="secondary" size="small">
                  <Message fontSize="small" />
                </IconButton>
                <IconButton color="secondary" size="small">
                  <Visibility fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  }
}

Portrait.propTypes = {
  objs: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
}

export default withStyles(styles)(Portrait);