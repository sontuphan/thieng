import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Add } from '@material-ui/icons';

import Drain from 'components/drain';
import Divider from 'components/divider';
import Project from 'components/project';
import Gallery from 'components/gallery';

import styles from './styles';

import { getProjects } from 'modules/projects.reducer';

class Factory extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.id !== this.props.auth.id)
      this.loadData();
  }

  loadData = () => {
    if (this.props.auth.id) return;
    this.props.getProjects(this.props.auth.id);
  }

  onGallery = (projectId) => {
    if (typeof projectId !== 'string') {
      if (this.state.goBack)
        return this.props.history.goBack();
      return this.props.history.push('/factory');
    }
    this.setState({ goBack: true });
    return this.props.history.push(`/factory/${projectId}`);
  }

  onAddProject = () => {
    console.log('add new project')
  }

  onStatus = () => {

  }

  onSave = () => {

  }

  onPublish = () => {

  }

  renderGallery = () => {
    let { projectId } = this.props.match.params;
    if (!projectId) return null;

    let project = this.props.projects.data[Number(projectId)];
    let author = project.user;
    if (!author) return null;

    let dialogContent = <Fragment>
      <Grid item xs={12} md={10}>
        <Typography variant="h1">Status</Typography>
      </Grid>
      <Grid item xs={12} md={10}>
        <TextField
          label="Hãy giới thiệu về dự án của bạn nào!"
          variant="outlined"
          color="secondary"
          size="small"
          onChange={this.onStatus}
          multiline fullWidth />
      </Grid>
      <Grid item xs={12} md={10}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.onSave}>
              <Typography>Lưu nháp</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={this.onPublish}>
              <Typography>Xuất bản</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>

    return <Gallery visible={true}
      project={project}
      author={author}
      onClose={this.onGallery}
      dialogContent={dialogContent} />
  }

  renderProject = (project) => {
    return <Project
      author={project.user}
      project={project}
      onClick={() => this.onGallery(`${project.id}`)} />
  }

  render() {
    let { auth, projects } = this.props;
    projects = projects.data;

    if (!auth.isValid) return null;
    if (!projects || !projects.length) return null;

    return <Fragment>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Drain />
        </Grid>
        <Grid item xs={10}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">Xưởng thiết kế</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={10}>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                startIcon={<Add />}
                onClick={this.onAddProject}>
                <Typography>Tạo mới</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={10}>
          <Grid container direction="row" spacing={2}>
            {
              projects.map((project, index) => {
                if (!project.user || !project.comments) return null;
                return <Grid item key={index} xs={12} sm={6} md={4}>
                  {this.renderProject(project)}
                </Grid>
              })
            }
          </Grid>
        </Grid>
      </Grid>
      {this.renderGallery()}
    </Fragment>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  projects: state.projects,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProjects,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Factory)));