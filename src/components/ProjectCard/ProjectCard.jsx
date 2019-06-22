import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import More from '../../static/More.svg';
import projectIcon from '../../static/projectIcon.png';

import './ProjectCard.css';

export class ProjectCard extends React.Component {
  handleClick = () => {
    const {
      match: { url },
      project: { id },
      history,
      project
    } = this.props;
    return history.push({ pathname: `${url}/details/${id}`, state: project });
  };

  render() {
    const { project } = this.props;
    return (
      <div
        className="project-card"
        onClick={this.handleClick}
        role="menu"
        tabIndex="0"
        onKeyDown
      >
        <div className="row">
          <div className="col-12">
            <div className="project-card__icon p-2">
              <img src={More} alt="" />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="project-card__image pt-3">
            <img src={project.logo || projectIcon} alt="" />
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
    );
  }
}

ProjectCard.propTypes = {
  project: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
};
export default withRouter(ProjectCard);
