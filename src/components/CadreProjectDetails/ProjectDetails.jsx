/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProjectDetailsCardBig from './ProjectDetailsCardBig';
import ProjectDetailsCardSmall from './ProjectDetailsCardSmall';
import ProjectEngineersTable from '../ProjectEngineersTable';
import './CadreProjectDetails.scss';
import ReturnButton from '../Buttons/ReturnButton';
import PMloader from '../CustomLoader/PMLoader';
import NotFoundPage from '../../views/NotFoundPage';

class ProjectDetails extends Component {
  constructor() {
    super();
    this.state = {
      projectDetails: null,
      loading: true
    };
  }

  async componentDidMount() {
    const { match, getProject } = this.props;
    let projectDetails;

    // Check if parameter in the browser is an Integer and the project doesn't exist in redux store already
    // before making the API call to fetch the resource
    // If it exists already, the page renders using the existing data in redux
    if (Number.isInteger(+match.params.id)) {
      await getProject(match.params.id);
      const { singleProject } = this.props;

      if (Object.keys(singleProject.data).length) {
        [projectDetails] = singleProject.data.project;
      }
    }

    this.setState({ projectDetails, loading: false });
  }

  render() {
    const { projectDetails, loading } = this.state;
    const { history, match } = this.props;

    const projectBody = projectDetails ? (
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
      <NotFoundPage />
    );

    return loading ? <PMloader /> : projectBody;
  }
}

ProjectDetails.propTypes = {
  location: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  getProject: PropTypes.shape().isRequired,
  singleProject: PropTypes.shape().isRequired
};
ProjectDetails.defaultProps = {
  location: { state: 'something here' }
};
export default ProjectDetails;
