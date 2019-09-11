import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { altDate } from '../../utils/formatDate';
import andelanEmailToName from '../../utils/formatAndelanUserEmail';

const CertificationDetailsLeft = ({ certificationInfo, vacancyInfo }) => {
  const vacancyDetails = vacancyInfo.vacancy_details || {};
  const renderTop = () => {
    const exclusive = certificationInfo.exclusive ? 'Exclusive' : 'Inclusive';
    return (
      <Fragment>
        <span className="projectType" id="projectType">
          {exclusive.toUpperCase()}
        </span>
        <p className="projectTitle">{certificationInfo.name}</p>
      </Fragment>
    );
  };

  return (
    <div className="project-container">
      <div className="project-overview">{renderTop()}</div>
      <div className="roleDetails">
        <p className="">
          {`Available Slot${vacancyInfo.available_slots > 1 ? 's : ' : ':'}`}
          <span id="availableSlots">{`${vacancyInfo.available_slots}`}</span>
        </p>
        <p>
          Start Date: <span>{` ${altDate(vacancyDetails.start_date)}`}</span>
        </p>
      </div>
      <div className="projectManager">
        <p className="headingText">Team Manager</p>
        <div className="projectManager__details">
          <img
            src="https://lorempixel.com/100/100/people/?97143"
            alt="project manager"
          />
          <div>
            <p className="managerName">
              {andelanEmailToName(vacancyDetails.requester)}
            </p>
            <p className="managerEmail">{vacancyDetails.requester}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

CertificationDetailsLeft.defaultProps = {
  certificationInfo: {},
  vacancyInfo: {}
};

CertificationDetailsLeft.propTypes = {
  certificationInfo: PropTypes.shape(),
  vacancyInfo: PropTypes.shape()
};

export default CertificationDetailsLeft;
