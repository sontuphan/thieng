import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Swipeable } from 'react-swipeable';

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

class CarouselSlide extends Component {
  constructor() {
    super();

    this.state = {
      animation: null
    }
  }

  slide = () => {
    let animation = ' animated slideInRight';
    if (this.props.direction === 'right')
      animation = ' animated slideInLeft';
    this.setState({ animation: animation }, () => {
      setTimeout(() => {
        this.setState({ animation: null });
      }, 1100);
    });
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.objs[0]) !== JSON.stringify(prevProps.objs[0])) {
      this.slide()
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

  renderSlides() {
    let { classes, objs } = this.props;

    let slides = [];
    for (let i = 0; i < objs.length; i++) {
      let obj = objs[i];
      slides.push(
        <Grid item key={i} className={this.state.animation ? classes.slide + this.state.animation : classes.slide}>
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
      );
    }
    return slides;
  }

  render() {
    let { classes } = this.props;
    return <Swipeable onSwipedLeft={this.props.onNext} onSwipedRight={this.props.onBack}>
      <Grid container spacing={2} className={classes.slides}>
        {this.renderSlides()}
      </Grid>
    </Swipeable>
  }
}

CarouselSlide.propTypes = {
  objs: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
}

export default withStyles(styles)(CarouselSlide);