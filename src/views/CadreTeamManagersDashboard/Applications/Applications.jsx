import React, { Component } from 'react';
import PropTypes from 'prop-types';
import weakKey from 'weak-key';
import PMloader from '../../../components/CustomLoader/PMLoader';
import TeamManagerCard from '../../../components/TeamManagerCard';
import { altDate as formatDate } from '../../../utils/formatDate';
import FilterDropdown from '../../../components/FilterDropdown';
import ApplicantCard from '../../../components/TeamManagerCard/ApplicantCard';

import './Applications.scss';

export default class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApplication: false,
      application: {},
      filteredApplications: [],
      currentRole: 'All Roles'
    };
  }

  componentDidMount = async () => {
    const { fetchApplications } = this.props;
    try {
      await fetchApplications();
      const {
        applications: {
          data: { pending }
        }
      } = this.props;
      return this.setState({
        filteredApplications: pending
      });
    } catch (e) {
      return false;
    }
  };

  filterByRole = role => {
    const {
      applications: {
        data: { pending }
      }
    } = this.props;
    let filteredApplicants = pending.filter(
      applicant => applicant.role.name === role
    );
    if (filteredApplicants.length === 0) filteredApplicants = pending;
    return this.setState({
      currentRole: role,
      filteredApplications: filteredApplicants
    });
  };

  /**
   * Concatenates the first name and the last name
   * @param firstName
   * @param lastName
   */
  formatName = (firstName, lastName) => firstName.concat(' ', lastName);

  /**
   *
   * gets the applicants array and returns all roles
   * @param {object} applicants
   * @returns {array} roles
   */

  getRoles = applicants => {
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
   * @param filter
   * @param current
   */

  renderHeader = (applications, filter, current) => {
    const filterItems = this.getRoles(applications);
    return (
      <div className="stats-header mb-4 d-flex justify-content-between">
        <div>
          {applications.length > 0 ? applications.length : 0} Pending
          Applications
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
   * Returns the card containing details about an applicant after being clicked
   * @param e
   * @param application
   */
  fetchSingleApplication = (e, application) => {
    const { showApplication } = this.state;
    this.setState({ showApplication: !showApplication, application });
  };

  mapTeamApplications = filteredApplications => {
    const teamApplications = filteredApplications.map(application => {
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
        <div className="mb-4" key={application.id}>
          <TeamManagerCard
            data-test="team_manager_card"
            role={role}
            event={e => this.fetchSingleApplication(e, application)}
            image={picture}
            key={weakKey(application)}
            name={this.formatName(firstName, lastName)}
            project={project.name}
            cohort={cohort}
            dateType="Start Date"
            date={formatDate(startDate)}
          />
        </div>
      );
    });
    return teamApplications.length ? (
      teamApplications
    ) : (
      <h1>There are currently no applications</h1>
    );
  };

  renderApplicantProfileCard = application => {
    const { showApplication } = this.state;
    return (
      <div
        className={`applicant_profile_card_wrapper ${
          showApplication ? 'show-application' : 'hide-application'
        }`}
      >
        <ApplicantCard application={application} />
      </div>
    );
  };

  render() {
    const {
      applications: { loading }
    } = this.props;

    const {
      showApplication,
      application,
      filteredApplications,
      currentRole
    } = this.state;

    return loading ? (
      <div className="cadre__page">
        <PMloader />
      </div>
    ) : (
      <div className="applications-wrapper">
        <div className="cadre__page">
          <div className="tm-project-applications">
            <div
              className={`all-applicants-cards d-flex flex-wrap justify-content-between ${
                showApplication ? 'add-width' : 'remove-width'
              }`}
            >
              {this.renderHeader(
                filteredApplications,
                this.filterByRole,
                currentRole
              )}
              {this.mapTeamApplications(filteredApplications)}
            </div>
          </div>
        </div>
        {showApplication && this.renderApplicantProfileCard(application)}
      </div>
    );
  }
}

Applications.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  applications: PropTypes.object.isRequired,
  fetchApplications: PropTypes.func.isRequired
};
