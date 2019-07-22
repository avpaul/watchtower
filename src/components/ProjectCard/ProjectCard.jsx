import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import More from '../../static/More.svg';
import projectIcon from '../../static/projectIcon.png';

import './ProjectCard.scss';

export class ProjectCard extends React.Component {
  handleClick = () => {
    const {
      match: { url },
      project: { id },
      history,
      project
    } = this.props;
    return history.push({ pathname: `${url}/${id}`, state: project });
  };

  handleFocusProject = (e = 'edit') => {
      const {
        focusProject,
        project,
        match: { url },
        history
      } = this.props;
      if(e === 'delete')
      {
        return focusProject(project);
      }
      return history.push({ pathname: `${url}/${project.id}/edit`, projectDetails:project});
  };

  renderDropdown = project => (
    <div className="dropdown-menu dropdown-menu-right">
      <button
        type="button"
        className="dropdown-item"
        onClick={this.handleFocusProject}
      >
        Edit Project
      </button>
      <button
        type="button"
        data-toggle="modal"
        data-target="#delete-project-modal"
        className="dropdown-item"
        onClick={()=> this.handleFocusProject('delete')}
        disabled={project.engineers.length}
      >
        Delete Project
      </button>
    </div>
  );

  render() {
    const { project } = this.props;
    return (
      <div
        className="project-card"
      >
        <div className="row">
          <div className="col-12">
            <div className="project-card__icon p-3" data-toggle="dropdown" >
              <img src={More} alt="" />
            </div>
            {this.renderDropdown(project)}
          </div>
        </div>
        <div className="content-wrapper"
        onClick={this.handleClick}
        role="menu"
        tabIndex="0"
        onKeyDown
        >
          <div className="row justify-content-center">
            <div className="project-card__image pt-3">
              <img src={project.logo || projectIcon} alt=""/>
            </div>
          </div>
          <div className="project-card__name">
            <p>{project.name}</p>
          </div>
          <div className="project-card__description mx-auto">
            <p>{project.about.substring(0, 45)}...</p>
          </div>
          <div className="project-card__engineers">
            <p>{project.engineers.length} engineers</p>
          </div>
        </div>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  project: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  focusProject: PropTypes.func.isRequired
};
export default withRouter(ProjectCard);
