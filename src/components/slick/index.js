import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Slider from 'react-slick';

import { ArrowBackRounded, ArrowForwardRounded } from '@material-ui/icons';

import { useStyles } from './styles';
import { useData } from './module';


/**
 * SlickChild
 * @param {*} props 
 */
export function SlickChild(props) {
  const classes = useStyles();

  return <div className={classes.gap}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {props.children}
      </Grid>
    </Grid>
  </div>
}

SlickChild.defaultProps = {
}

SlickChild.propTypes = {
}

/**
 * Slick
 * Involving NextButton and PrevButton
 * @param {*} props
 */

function NextButton({ className, style, onClick }) {
  return <div className={className} style={style}>
    <Fab color="primary" onClick={onClick} size="small">
      <ArrowForwardRounded fontSize="small" />
    </Fab>
  </div >
}

function PrevButton({ className, style, onClick }) {
  return <div className={className} style={style}>
    <Fab color="primary" onClick={onClick} size="small">
      <ArrowBackRounded fontSize="small" />
    </Fab>
  </div>
}

export default function Slick(props) {
  const slickRef = useRef();
  const { width } = useData(slickRef);
  const theme = useTheme();

  const { minChildWidth, maxChildWidth } = props;
  const slidesToShow = 1;
  if (props.slidesToShow) slidesToShow = props.slidesToShow;
  else slidesToShow = Math.floor(2 * width / (minChildWidth + maxChildWidth));

  const slickProps = {
    centerMode: props.centerMode,
    dots: true,
    infinite: true,
    autoplay: props.autoplay,
    arrows: props.arrows,
    speed: theme.transitions.duration.standard,
    slidesToScroll: props.slidesToScroll,
    slidesToShow,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
  }

  return <Grid container spacing={2}>
    <Grid item xs={12} ref={slickRef}>
      <Slider {...slickProps} >
        {props.children}
      </Slider>
    </Grid>
  </Grid>
}

Slick.defaultProps = {
  arrows: false,
  autoplay: false,
  centerMode: false,
  slidesToScroll: 1,
  slidesToShow: 0,
  minChildWidth: 250,
  maxChildWidth: 300,
}

Slick.propTypes = {
  arrows: PropTypes.bool,
  autoplay: PropTypes.bool,
  centerMode: PropTypes.bool,
  slidesToScroll: PropTypes.number,
  slidesToShow: PropTypes.number,
  minChildWidth: PropTypes.number,
  maxChildWidth: PropTypes.number,
}