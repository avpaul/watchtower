/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProjectDetailsCardBig from './ProjectDetailsCardBig';
import ProjectDetailsCardSmall from './ProjectDetailsCardSmall';
import ProjectEngineersTable from '../ProjectEngineersTable';
import './CadreProjectDetails.scss';
import ReturnButton from '../Buttons/ReturnButton';

class ProjectDetails extends Component {
  constructor() {
    super();
    this.state = {
      projectDetails: null,
      loading: true
    };
  }

  async componentDidMount() {
    const { allProjects, match, getProject } = this.props;
    let projectDetails = allProjects.data.find(
      project => project.id === parseInt(match.params.id, 10)
    );

    if (Number.isInteger(+match.params.id) && !projectDetails) {
      await getProject(match.params.id);
      const { singleProject } = this.props;

      [projectDetails] = singleProject.data.project;
    }

    this.setState({ projectDetails, loading: false });
  }

  render() {
    const { projectDetails, loading } = this.state;
    const { history, match } = this.props;
    return !loading ? (
      <div className="project-details">
        <div className="d-flex justify-content-between">
          <ReturnButton history={history} />
          <Link
            className="project-details__edit-btn"
            to={{
              pathname: `/cadre/projects/${parseInt(match.params.id, 10)}/edit`,
              projectDetails
            }}
          >
            {' '}
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
  allProjects: PropTypes.shape(),
  getProject: PropTypes.shape().isRequired,
  singleProject: PropTypes.shape().isRequired
};
ProjectDetails.defaultProps = {
  location: { state: 'something here' },
  allProjects: { data: [] }
};
export default ProjectDetails;
