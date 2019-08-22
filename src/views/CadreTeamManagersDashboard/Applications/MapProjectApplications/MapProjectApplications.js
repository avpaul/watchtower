import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TeamManagerCard from '../../../../components/TeamManagerCard';
import FilterDropdown from '../../../../components/FilterDropdown';
import './MapProjectApplications.scss';
import { altDate as formatDate } from '../../../../utils/formatDate';

/**
 *
 * gets the applicants array and returns all roles
 * @param {object} applicants
 * @returns {array} roles
 */
const getRoles = applicants => {
  let roles = ['All Roles'];
  if (applicants.length > 0) {
    roles = applicants.reduce(
      (accumulator, application) => {
        const roleName = application.role.name;
        if (!accumulator.includes(roleName)) accumulator.push(roleName);
        return accumulator;
      },
      ['All Roles']
    );
  }
  return roles;
};
/**
 * Returns the page stats header
 * @param applications
 */
const renderHeader = (applications, filter, current) => {
  const filterItems = getRoles(applications);
  return (
    <div className="stats-header mb-4">
      <div>
        {applications.length > 0 ? applications.length : 0} Pending Applications
      </div>
      <FilterDropdown
        items={filterItems}
        current={current}
        width="400"
        chevronColor="#808FA3"
        dropdownBackgroundColor="#FFFFFF"
        getFilter={(type, value) => filter(value)}
      />
    </div>
  );
};

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
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [currentRole, setCurrentRole] = useState('All Roles');

  useEffect(() => {
    setFilteredApplications(applications);
  }, [applications]);

  const filterByRole = role => {
    let filteredApplicants = applications.filter(
      applicant => applicant.role.name === role
    );
    if (filteredApplicants.length === 0) filteredApplicants = applications;
    setCurrentRole(role);
    setFilteredApplications(filteredApplicants);
  };
  return (
    <div className="tm-project-applications">
      {renderHeader(applications, filterByRole, currentRole)}
      {applications.length > 0 ? (
        renderApplications(filteredApplications)
      ) : (
        <div />
      )}
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
