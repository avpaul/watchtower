/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import ProjectDetailsCardBig from './ProjectDetailsCardBig';
import ProjectDetailsCardSmall from './ProjectDetailsCardSmall';
import ProjectEngineersTable from '../ProjectEngineersTable';
import './CadreProjectDetails.css';
import mockProjects from '../../__mocks__/projectDetails';
import ReturnButton from '../Buttons/ReturnButton';

class ProjectDetails extends Component {
  constructor() {
    super();
    this.state = {
      projectDetails: {},
      loading: true
    };
  }

  componentDidMount() {
    const { allProjects, match, history } = this.props;
    const projectDetails = allProjects.data.find(
      project => project.id === parseInt(match.params.id, 10)
    );
    if (!projectDetails) history.replace('/cadre/projects');
    return this.setState({ projectDetails, loading: false });
  }

  render() {
    const { projectDetails, loading } = this.state;
    const { history } = this.props;
    return !loading ? (
      <div className="project-details">
        <div className="d-flex justify-content-between">
          <ReturnButton history={history} />
          <Link className="project-details__edit-btn" to="/cadre/projects/edit">
            EDIT PROJECT
          </Link>
        </div>
        <div className="project-details__main m-3">
          <ProjectDetailsCardBig projectDetails={projectDetails} />
          <ProjectDetailsCardSmall projectDetails={projectDetails} />
        </div>
        <div className="project-details__engineers">
          <h3>List of {projectDetails.name} engineers</h3>
          <ProjectEngineersTable engineers={projectDetails.engineers} />
        </div>
      </div>
    ) : (
      <div>loading</div>
    );
  }
}

ProjectDetails.propTypes = {
  location: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  allProjects: PropTypes.shape()
};
ProjectDetails.defaultProps = {
  location: { state: 'something here' },
  allProjects: { data: [mockProjects] }
};
export default withRouter(ProjectDetails);
