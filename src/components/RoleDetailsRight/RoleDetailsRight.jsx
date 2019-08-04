import React from 'react';
import PropTypes from 'prop-types';
import projectIcon from '../../static/projectdown.svg';
import doc from '../../static/doc.svg';

const RoleDetailsRight = ({ projectInfo, roleInfo, engineer }) => {
  const renderDocuments = () =>
    projectInfo[0].documents.map(document => (
      <a href={document.url} key={document.id} rel="noopener">
        <img src={doc} alt="document logo" />
        {document.name.length > 25
          ? `${document.name.substring(0, 22)}...`
          : document.name}
      </a>
    ));

  const hasApplied = () => {
    const { applications } = roleInfo;
    let isApplicationActive = false;

    if (applications) {
      applications.forEach(application => {
        if (
          application.applicant.fellow_id === engineer.fellow_id &&
          application.project_role_id === roleInfo.id &&
          application.project_id === projectInfo[0].id
        ) {
          isApplicationActive = true;
        }
      });
    }

    return isApplicationActive;
  };

  return (
    <div className="projectAndRoleDetailContainer">
      <div className="mainHeading">
        <img src={projectIcon} alt="project logo" />
        <p className="roleName">{roleInfo.name}</p>
        <p className="projectName">{projectInfo[0].name}</p>
        {hasApplied() ? (
          <button disabled id="buttonDisabled" type="button">
            ALREADY APPLIED
          </button>
        ) : (
          <button
            data-toggle="modal"
            data-target="#applyForRoleModal"
            type="button"
          >
            APPLY FOR THIS ROLE
          </button>
        )}
      </div>
      <div className="mainBody">
        <h6 className="paragraphHeadings">Role Description</h6>
        <p>{roleInfo.description}</p>
        <h6 className="paragraphHeadings">About {projectInfo[0].name}</h6>
        <p>{projectInfo[0].about}</p>
        <h6 className="paragraphHeadings">Relevant Documents</h6>
        {renderDocuments()}
      </div>
    </div>
  );
};

RoleDetailsRight.defaultProps = {
  projectInfo: [],
  roleInfo: {}
};

RoleDetailsRight.propTypes = {
  projectInfo: PropTypes.arrayOf(PropTypes.shape()),
  engineer: PropTypes.shape().isRequired,
  roleInfo: PropTypes.shape()
};

export default RoleDetailsRight;
