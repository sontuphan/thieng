import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Swipeable } from 'react-swipeable';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import { ThreeDRotationRounded, ArrowBackRounded, ArrowForwardRounded } from '@material-ui/icons';

import ColorSelect from './colorSelect';
import Drain from 'components/drain';
import ImageUploader from './imageUploader'

import styles from './styles';
import utils from 'helpers/utils';

class Shelf extends Component {
  constructor() {
    super();

    this.state = {
      showing: 0,
      translate: 0,
      color: '#ffffff'
    }
    this.hiddenRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showing !== this.state.showing) {
      utils.getAccessibleTextColor(this.props.objects[this.state.showing].url).then(color => {
        this.setState({ color });
      });
    }
  }

  onColor = (color) => {
    let { objects } = this.props;
    objects.forEach((obj, step) => {
      if (obj.color === color) this.onChange(step);
    });
  }

  onChange = (step) => {
    let { objects } = this.props;
    let translate = -step * (20 * objects.length - 100) / (objects.length - 1);
    if (translate > 0) translate = 0;
    this.setState({
      showing: step,
      translate: translate + 1
    }, () => this.setState({ translate: translate }));
  }

  onNext = () => {
    let { objects } = this.props;
    let step = this.state.showing + 1;
    if (step >= objects.length) step = objects.length - 1;
    this.onChange(step);
  }

  onBack = () => {
    let step = this.state.showing - 1;
    if (step < 0) step = 0;
    this.onChange(step);
  }

  render() {
    let { classes, author, objects } = this.props;
    let { showing } = this.state;

    return <Swipeable onSwipedLeft={this.onNext} onSwipedRight={this.onBack}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Grid container
            spacing={2}
            justify="center"
            alignItems="center"
            style={objects[showing].type !== 'png' ? {
              backgroundImage: `url('${objects[showing].url}')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            } : null}
            className={classes.shelf}
          >
            <Grid item xs={12}>
              <Grid container justify="flex-end" spacing={2}>
                <Grid item>
                  <IconButton onClick={this.props.on3D}>
                    <ThreeDRotationRounded style={{ color: this.state.color }} />
                  </IconButton>
                </Grid>
                {this.props.editable || true ? <Grid item>
                  <ImageUploader color={this.state.color} visible />
                </Grid> : null}
              </Grid>
            </Grid>

            <Grid item
              xs={10}
              className={classes.imageShelf}
              style={objects[showing].type === 'png' ? {
                backgroundImage: `url('${objects[showing].url}')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              } : null}
            />
            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={1} >
                <Grid item className={classes.link} component={RouterLink} to={author.link}>
                  <Avatar alt={author.displayname} src={author.avatar} />
                </Grid>
                <Grid item xs={8} className={classes.link} component={RouterLink} to={author.link}>
                  <Typography style={{ color: this.state.color }} noWrap>{author.displayname}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <ColorSelect
                colors={objects.map(obj => obj.color).filter(color => color !== null)}
                value={objects[showing].color}
                onChange={this.onColor}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Drain small />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2} md={1}>
              <Grid container justify="flex-start">
                <Grid item>
                  <IconButton onClick={this.onBack}>
                    <ArrowBackRounded />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8} md={10}>
              <SwipeableViews
                index={showing}
                onChangeIndex={this.onChange}
                containerStyle={{
                  alignItems: "center",
                  transform: `translate(${this.state.translate}%, 0px)`
                }}
                slideClassName={classes.slide}
                disabled
              >
                {
                  objects.map((object, i) => <Grid item key={i}>
                    <Grid container justify="center">
                      <Badge
                        overlap="circle"
                        variant="dot"
                        color="primary"
                        invisible={this.state.showing !== i}
                      >
                        <Avatar
                          alt={object.url}
                          src={object.url}
                          onClick={() => this.onChange(i)}
                        />
                      </Badge>
                    </Grid>
                  </Grid>)
                }
              </SwipeableViews>
            </Grid>
            <Grid item xs={2} md={1}>
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton onClick={this.onNext}>
                    <ArrowForwardRounded />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Swipeable>
  }
}

Shelf.defaultProps = {
  on3D: () => { },
  editable: false,
}

Shelf.propTypes = {
  author: PropTypes.object.isRequired,
  objects: PropTypes.array.isRequired,
  on3D: PropTypes.func,
  editable: PropTypes.bool,
}

export default withRouter(withStyles(styles)(Shelf));