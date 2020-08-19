import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { ExpandMoreRounded } from '@material-ui/icons';

import { BottomDrawer } from 'components/drawers';
import { ProductCard } from 'components/cards';
import Drain from 'components/drain';
import Stall from 'containers/stall';
import Action from './action';
import { CircularProgressButton } from 'components/buttons';

import { getItems } from 'modules/items.reducer';
import { addItem, updateItem } from 'modules/items.reducer';

import styles from './styles';


class UserFactory extends Component {
  constructor() {
    super();

    this.state = {
      editableId: '',
      visible: false,
      selected: [],
      multipleChoice: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = (reset = false) => {
    let { items: { factory: { pagination: { limit, page } } } } = this.props;
    let condition = { status: 'creating' }
    page = reset ? 0 : page + 1;
    const { getItems } = this.props;
    return this.setState({ isLoading: true }, () => {
      return getItems(condition, limit, page, 'factory').then(() => {
        return this.setState({ isLoading: false });
      }).catch(console.error);
    });
  }

  onToggle = (e) => {
    return this.setState({ multipleChoice: e.target.checked });
  }

  onClick = (itemId) => {
    const { multipleChoice } = this.state;
    if (multipleChoice) {
      return () => {
        let { selected } = this.state;
        let index = selected.indexOf(itemId);
        if (index === -1) selected.push(itemId);
        else if (index === selected.length - 1) selected.pop();
        else selected[index] = selected.pop();
        return this.setState({ selected });
      }
    }
    return () => this.setState({ editableId: itemId, visible: true });
  }

  onAdd = (value) => {
    return this.props.addItem(value).then(re => {
      return this.loadData(true);
    }).then(() => this.setState({ visible: false })).catch(console.error);
  }

  onUpdate = (value) => {
    return this.props.updateItem(value).then(re => {
      return this.loadData(true);
    }).then(() => this.setState({ visible: false })).catch(console.error);
  }

  renderItems = () => {
    const { items: { factory: { data } } } = this.props;
    const { multipleChoice, selected } = this.state;
    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map((obj, i) => <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard
          itemId={obj._id}
          onClick={this.onClick(obj._id)}
          selective={multipleChoice}
          selected={selected.includes(obj._id)}
        />
      </Grid>)}
    </Grid>
  }

  render() {
    const { classes } = this.props;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h3">Xưởng</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography color="textSecondary">Tùy chọn</Typography>
          </Grid>
          <Grid item>
            <Switch
              color="primary"
              checked={this.state.multipleChoice}
              onChange={this.onToggle}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {this.renderItems()}
      </Grid>
      <Grid item xs={12}>
        <BottomDrawer
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stall
                itemId={this.state.editableId}
                onAdd={this.onAdd}
                onUpdate={this.onUpdate}
                editable
              />
            </Grid>
            <Grid item xs={12}>
              <Drain />
            </Grid>
          </Grid>
        </BottomDrawer>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item>
            <CircularProgressButton
              endIcon={<ExpandMoreRounded />}
              isLoading={this.state.isLoading}
              onClick={() => this.loadData(false)}
            >
              <Typography>Thêm</Typography>
            </CircularProgressButton>
          </Grid>
        </Grid>
      </Grid>
      <Action
        onAdd={() => this.setState({ editableId: '', visible: true })}
        onDelete={() => { }}
      />
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems,
  addItem, updateItem,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserFactory)));