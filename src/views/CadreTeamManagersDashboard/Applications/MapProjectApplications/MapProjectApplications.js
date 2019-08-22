import React from 'react';
import PropTypes from 'prop-types';
import TeamManagerCard from '../../../../components/TeamManagerCard';
import './MapProjectApplications.scss';
import { altDate as formatDate } from '../../../../utils/formatDate';

/**
 * Returns the page stats header
 * @param applications
 */
const renderHeader = applications => (
  <div className="stats-header mb-4">
    {applications.length > 0 ? applications.length : 0} Pending Applications
  </div>
);

/**
 * Concatenates the first name and the last name
 * @param firstName
 * @param lastName
 */
const formatName = (firstName, lastName) => firstName.concat(' ', lastName);

/**
 * Does the mapping of the data in the TeamManagerCard card
 * @param applications
 * @returns Applicants' cards
 */
const renderApplications = applications => (
  <div className="row">
    {applications.map(application => {
      const {
        role: { name: role },
        project,
        applicant: {
          picture,
          first_name: firstName,
          last_name: lastName,
          cohort,
          sims_start_date: startDate
        }
      } = application;
      return (
        <div className="col-4 mb-4" key={application.applicant.id}>
          <TeamManagerCard
            role={role}
            image={picture}
            name={formatName(firstName, lastName)}
            project={project.name}
            cohort={cohort}
            dateType="Start Date"
            date={formatDate(startDate)}
          />
        </div>
      );
    })}
  </div>
);

/**
 * Main component on this file
 * @param {applications}
 */
export default function MapProjectApplicants({ applications }) {
  return (
    <div className="tm-project-applications">
      {renderHeader(applications)}
      {applications.length > 0 ? renderApplications(applications) : <div />}
      {}
    </div>
  );
}

/**
 * PropTypes
 */
MapProjectApplicants.propTypes = {
  applications: PropTypes.shape([]).isRequired
};
