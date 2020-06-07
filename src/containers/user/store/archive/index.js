import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import async from 'async';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { ProductCard } from 'components/cards';
import Action from './action';

import { getItems, updateItem } from 'modules/items.reducer';

import styles from './styles';

const COMPONENT = 'archive';


class Archive extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      selected: [],
      multipleChoice: false,
    }
  }

  componentDidMount() {
    this.loadData(true);
  }

  loadData = (reset = false) => {
    let { items: { [COMPONENT]: { pagination: { limit, page } } } } = this.props;
    page = reset ? 0 : page + 1;
    const { getItems } = this.props;
    const condition = { status: 'archived' }
    return getItems(condition, limit, page, COMPONENT);
  }

  onToogle = (e) => {
    return this.setState({ multipleChoice: e.target.checked });
  }

  onClick = (itemId) => {
    const { multipleChoice } = this.state;
    if (multipleChoice) {
      let { selected } = this.state;
      let index = selected.indexOf(itemId);
      if (index === -1) selected.push(itemId);
      else if (index === selected.length - 1) selected.pop();
      else selected[index] = selected.pop();
      return this.setState({ selected });
    }
    return null;
  }

  onRestore = () => {
    const { updateItem } = this.props;
    const { selected } = this.state;
    return async.eachSeries(selected, (itemId, cb) => {
      return updateItem({ _id: itemId, status: 'selling' }).then(re => {
        return cb();
      }).catch(er => {
        return cb(er);
      });
    }, (er) => {
      if (er) return console.error(er);
      return this.loadData(true);
    });
  }

  renderItems = () => {
    let { items: { [COMPONENT]: { data } } } = this.props;
    const { multipleChoice, selected } = this.state;
    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map(obj => <Grid key={obj._id} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard
          itemId={obj._id}
          onClick={() => this.onClick(obj._id)}
          selective={multipleChoice}
          selected={selected.includes(obj._id)}
        />
      </Grid>)}
    </Grid>
  }

  render() {
    // let { classes } = this.props;
    const { multipleChoice } = this.state;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            <Typography>Chọn nhiều sản phẩm</Typography>
          </Grid>
          <Grid item>
            <Switch
              color="primary"
              checked={this.state.multipleChoice}
              onChange={this.onToogle}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {this.renderItems()}
      </Grid>
      {multipleChoice ? <Action onRestore={this.onRestore} /> : null}
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems, updateItem
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Archive)));