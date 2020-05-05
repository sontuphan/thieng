import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';

import { AddCircleRounded, CloseRounded } from '@material-ui/icons';

import styles from './styles';
import utils from 'helpers/utils';

const DEFAULT_STATE = {
  url: null,
  error: null,
  visibleDialog: false,
  isColor: false,
  color: '#000000',
  colors: ['#000000']
}

class ImageUploader extends Component {
  constructor() {
    super();

    this.state = { ...DEFAULT_STATE }
    this.hiddenRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.visibleDialog && prevState.visibleDialog !== this.state.visibleDialog) {
      utils.extractImageColors(this.state.url).then(palette => {
        let colors = [palette.DarkVibrant.hex, palette.Vibrant.hex, palette.LightVibrant.hex, palette.DarkMuted.hex, palette.Muted.hex, palette.LightMuted.hex]
        let color = colors[0];
        this.setState({ color, colors });
      }).catch(er => console.error(er));
    }
  }

  onUpload = () => {
    this.hiddenRef.current.click();
  }

  onChange = (e) => {
    if (!e.target.files[0]) return;
    let url = URL.createObjectURL(e.target.files[0]);
    return this.setState({ url, visibleDialog: true });
  }

  onToggle = () => {
    this.setState({ ...DEFAULT_STATE, visibleDialog: !this.state.visibleDialog }, () => {
      this.hiddenRef.current.value = null;
    });
  }

  onColor = (value) => {
    this.setState({ color: value.hex });
  }

  onOk = () => {
    this.props.onChange({
      url: this.state.url,
      color: this.state.isColor ? this.state.color : null,
    });
    this.onToggle();
  }

  render() {
    let { classes } = this.props;
    if (!this.props.visible) return null;

    return <Grid container spacing={2}>
      {/* Button */}
      <Grid item>
        <IconButton onClick={this.onUpload}>
          <AddCircleRounded style={{ color: this.props.iconColor }} />
        </IconButton>
      </Grid>
      {/* Hidden input */}
      <input
        type="file"
        ref={this.hiddenRef}
        style={{ display: "none" }}
        onChange={this.onChange}
      />
      {/* Confirmation dialog */}
      <Dialog
        maxWidth="md"
        open={this.state.visibleDialog}
        onClose={this.onToggle}
      >
        <DialogTitle>
          <Grid container spacing={2} alignItems="center" className={classes.noWrap}>
            <Grid item className={classes.stretch}>
              <Typography variant="h3">Image Uploader</Typography>
            </Grid>
            <Grid item>
              <IconButton color="secondary" size="small" onClick={this.onToggle}>
                <CloseRounded />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>You can choose a major color to present the product.</Typography>
            </Grid>
            <Grid item xs={12}>
              {this.state.error ? <Typography color="primary">{this.state.error}</Typography> : null}
            </Grid>
            <Grid item xs={12} md={8}>
              <img width="100%" height="auto" alt={this.state.url} src={this.state.url} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                    <Grid item className={classes.stretch}>
                      <Typography>Enable theme color</Typography>
                    </Grid>
                    <Grid item>
                      <Switch
                        checked={this.state.isColor}
                        onChange={() => this.setState({ isColor: !this.state.isColor })}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={this.state.isColor ? null : classes.disabled}>
                  <BlockPicker
                    triangle="hide"
                    width="100%"
                    color={this.state.color}
                    colors={this.state.colors}
                    onChange={this.onColor}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between" alignItems="center" className={classes.action} spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.onToggle}
              >
                <Typography>Need help?</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Grid container className={classes.noWrap} justify="flex-end" spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onOk}
                  >
                    <Typography>OK</Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.onToggle}
                  >
                    <Typography>Cancel</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  }
}

ImageUploader.defaultProps = {
  onChange: () => { },
  visible: false,
  iconColor: '#ffffff',
}

ImageUploader.propTypes = {
  onChange: PropTypes.func,
  visible: PropTypes.bool,
  iconColor: PropTypes.string,
}

export default withStyles(styles)(ImageUploader);