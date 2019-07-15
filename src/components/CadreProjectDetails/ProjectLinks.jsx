import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SlackLogo from '../../static/slack-logo-icon.png';
import InvisionLogo from '../../static/invision-logo.svg';

const ProjectLinks = ({ projectDetails }) => (
  <Fragment>
    <a
      href={`https://andela.slack.com/messages/CCU16SAKA/${projectDetails.channels.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="links">
        <img src={SlackLogo} alt="slack-logo" />#
        {projectDetails.name.substring(0, 10)}... team on slack
      </div>
    </a>
    <a href={projectDetails.mockups} target="_blank" rel="noopener noreferrer">
      <div className="links">
        <img src={InvisionLogo} alt="invision logo" />
        {projectDetails.name} on invision
      </div>
    </a>
  </Fragment>
);
ProjectLinks.propTypes = {
  projectDetails: PropTypes.shape({}).isRequired
};
export default ProjectLinks;
