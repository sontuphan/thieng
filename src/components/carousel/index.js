import React, { forwardRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';

/**
 * Config Swiper
 */
SwiperCore.use([Pagination]);


/**
 * CarouselChild
 * @param {*} props 
 */
const CarouselChild = forwardRef((props, ref) => {
  return <SwiperSlide {...props} ref={ref} style={{ width: 'auto' }} />
});

CarouselChild.displayName = 'SwiperSlide';

export { CarouselChild }


/**
 * Carousel
 * @param {*} props 
 */
function Carousel(props) {
  const theme = useTheme();
  const classes = useStyles();

  const paginationProps = props.pagination ? {
    pagination: { bulletActiveClass: classes.bullet, clickable: true }
  } : null;
  const swiperProps = {
    slidesPerView: !props.slidesPerView ? 'auto' : props.slidesPerView,
    spaceBetween: props.spacing,
    speed: theme.transitions.duration.standard,
    freeMode: !props.slidesPerGroup ? true : false,
    slidesPerGroup: Math.max(1, props.slidesPerGroup),
    onSlideChange: e => props.onChange(e.activeIndex),
    autoplay: props.autoplay,
    ...paginationProps,
  }

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Swiper {...swiperProps} >
        {props.children}
      </Swiper>
    </Grid>
  </Grid>
}

Carousel.defaultProps = {
  pagination: false,
  autoplay: false,
  centerMode: false,
  slidesPerGroup: 0, // Default: 0 means auto
  slidesPerView: 0,
  freeMode: false,
  spacing: 16,
  onChange: () => { },
}

Carousel.propTypes = {
  pagination: PropTypes.bool,
  autoplay: PropTypes.bool,
  centerMode: PropTypes.bool,
  slidesPerGroup: PropTypes.number,
  slidesPerView: PropTypes.number,
  freeMode: PropTypes.bool,
  spacing: PropTypes.number,
  onChange: PropTypes.func,
}

export default Carousel;