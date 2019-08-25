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
      roles: [],
      loading: true
    };
  }

  async componentDidMount() {
    const { match, getProject, fetchAllRoles } = this.props;
    let projectDetails;

    // Check if parameter in the browser is an Integer before making the API call to fetch the resource
    if (Number.isInteger(+match.params.id)) {
      await getProject(match.params.id);
      const { singleProject } = this.props;

      if (Object.keys(singleProject.data).length) {
        [projectDetails] = singleProject.data.project;
      }
    }

    await fetchAllRoles();
    const { cadreRoles: roles } = this.props;

    this.setState({ roles });
    this.setState({ projectDetails, loading: false });
  }

  render() {
    const { projectDetails, loading, roles } = this.state;
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
          <ProjectEngineersTable
            engineers={projectDetails.engineers}
            roles={roles}
          />
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
  getProject: PropTypes.func.isRequired,
  singleProject: PropTypes.shape().isRequired,
  cadreRoles: PropTypes.arrayOf(PropTypes.shape({})),
  fetchAllRoles: PropTypes.func.isRequired
};
ProjectDetails.defaultProps = {
  location: { state: 'something here' },
  cadreRoles: []
};
export default ProjectDetails;
