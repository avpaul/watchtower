import React from 'react';
import PropTypes from 'prop-types';
import projectIcon from '../../static/projectdown.svg';
import doc from '../../static/doc.svg';
import dateCountDown, { formatCountDown } from '../../utils/dateCountDown';

const RoleDetailsRight = ({ projectInfo, roleInfo, engineer }) => {
  const renderDocuments = () =>
    projectInfo.documents.map(document => (
      <a href={document.url} key={document.id} rel="noopener noreferrer">
        <img src={doc} alt="document logo" />
        {document.name.length > 25
          ? `${document.name.substring(0, 22)}...`
          : document.name}
      </a>
    ));

  const renderButton = () => {
    if (engineer.role) {
      return (
        <button disabled id="buttonDisabled" type="button">
          YOU HAVE A ROLE
        </button>
      );
    }

    const {
      vacancy: { hasApplied }
    } = roleInfo;
    if (hasApplied) {
      return (
        <button disabled id="buttonDisabled" type="button">
          ALREADY APPLIED
        </button>
      );
    }
    return (
      <button
        data-toggle="modal"
        data-target="#applyForRoleModal"
        type="button"
      >
        APPLY FOR THIS ROLE
      </button>
    );
  };

  return (
    <div className="projectAndRoleDetailContainer">
      <div className="main-heading">
        <div className="headingLeft">
          <img src={projectIcon} alt="project logo" />
          <div>
            <p className="roleName">{roleInfo.role.name}</p>
            <p className="projectName">{projectInfo.name}</p>
          </div>
        </div>
        <div className="headingRight">
          {renderButton()}
          <div className="vacancy__count">
            Days Left:{' '}
            <span>
              {`${formatCountDown(
                dateCountDown(roleInfo.vacancy.closing_date)
              )}`}
            </span>
          </div>
        </div>
      </div>
      <div className="mainBody">
        <h6 className="paragraphHeadings">Role Description</h6>
        <p>{roleInfo.role.description}</p>
        <h6 className="paragraphHeadings">About {projectInfo.name}</h6>
        <p>{projectInfo.about}</p>
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
  projectInfo: PropTypes.instanceOf(Object),
  engineer: PropTypes.shape().isRequired,
  roleInfo: PropTypes.shape()
};

export default RoleDetailsRight;
