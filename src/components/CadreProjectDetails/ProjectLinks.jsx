import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SlackLogo from '../../static/slack-logo-icon.png';
import InvisionLogo from '../../static/invision-logo.svg';

const ProjectLinks = ({ projectDetails }) => (
  <Fragment>
    <a
      href={
        projectDetails.channels.id
          ? `https://andela.slack.com/messages/CCU16SAKA/${projectDetails.channels.id}`
          : '#'
      }
    >
      <div className="links">
        <img src={SlackLogo} alt="slack-logo" className="mr-1" />
        {projectDetails.channels.id
          ? `#${projectDetails.name.substring(0, 10)}`
          : 'N/A'}
      </div>
    </a>
    <a
      href={projectDetails.mockups ? `${projectDetails.mockups}` : '#'}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="links">
        <img src={InvisionLogo} alt="invision logo" className="mr-1" />
        {projectDetails.mockups
          ? `
        ${projectDetails.name}`
          : 'N/A'}
      </div>
    </a>
  </Fragment>
);
ProjectLinks.propTypes = {
  projectDetails: PropTypes.shape({}).isRequired
};
export default ProjectLinks;
