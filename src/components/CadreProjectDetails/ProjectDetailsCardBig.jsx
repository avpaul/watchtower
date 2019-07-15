import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { formatText } from '../../services/helper';
import DocLogo from '../../static/doc.svg';

const ProjectDetailsCardBig = ({ projectDetails }) => {
  const { paragraph1, paragraph2 } = formatText(projectDetails.about);
  return (
    <Fragment>
      <div className="project-details__card-big">
        <h2>About {projectDetails.name}</h2>
        <p>{paragraph1}</p>

        <p>{paragraph2}</p>
        <h2>Relevant Documents</h2>
        <div className="relevant-documents">
          {projectDetails.documents &&
            projectDetails.documents.map(document => (
              <a href={document.url} download>
                <div className="relevant-documents-card">
                  <img src={DocLogo} alt="doc-logo" />
                  <span className="text-left w-75">
                    {document.name.substring(0, 20)}...
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>
    </Fragment>
  );
};
ProjectDetailsCardBig.propTypes = {
  projectDetails: PropTypes.shape({}).isRequired
};
export default ProjectDetailsCardBig;
