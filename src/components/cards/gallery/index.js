import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import { ExpandMoreRounded, ExpandLessRounded } from '@material-ui/icons';

import { ImageCard } from 'components/cards';

import { useStyles } from './styles';
import { useData } from './module';
import utils from 'helpers/utils';

function GalleryCard(props) {
  // Define hooks
  const [checked, setChecked] = useState(false);
  const [height, setHeight] = useState(40);
  const myRef = useRef();
  const classes = useStyles();
  const data = useData(props.itemId);
  useEffect(() => {
    if (myRef.current)
      return setHeight(myRef.current.offsetWidth / 2);
  }, [data]);
  // Define functions
  if (!data) return null;
  const onCollapse = () => setChecked((prev) => !prev);
  const imageProps = !checked ? onCollapse :
    props.onClick ? { onClick: props.onClick } : { component: Link, to: `/item/${data._id}` }
  // Render component
  return <Grid container spacing={2}>
    <Grid item xs={12} ref={myRef}>
      <Collapse in={checked} collapsedHeight={height}>
        <Paper elevation={0} className={classes.paper}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={6} {...imageProps}>
              <ImageCard _id={data.thumbnailId || data.fileIds[0]} />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    {data.tags.map((tag, i) => <Grid item key={i}>
                      <Chip className={classes.chip} color="primary" label={tag} size="small" />
                    </Grid>)}
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.cursor}>
                  <Typography variant="h3">{data.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1} alignItems="center" justify="flex-end">
                    <Grid item>
                      <Typography>{utils.prettyNumber(data.price, 'long')} ₫</Typography>
                    </Grid>
                    <Grid item>
                      <Chip className={classes.chip} color="primary" label={props.amount} size="small" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{data.description1}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Collapse>
    </Grid>
    <Grid item xs={12} className={classes.expansion}>
      <Grid container spacing={2} justify="flex-end">
        <Grid item>
          <IconButton size="small" onClick={onCollapse}>
            {checked ? <ExpandLessRounded /> : <ExpandMoreRounded />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  </Grid >
}

GalleryCard.defaultProps = {
  onClick: null,
  amount: '',
  // onClick is null then using route
}

GalleryCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  amount: PropTypes.string,
  onClick: PropTypes.func,
}

export default GalleryCard;