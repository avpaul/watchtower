import React, { Component } from 'react';
import PropTypes from 'prop-types';
import weakKey from 'weak-key';
import PMloader from '../../../components/CustomLoader/PMLoader';
import TeamManagerCard from '../../../components/TeamManagerCard';
import { altDate as formatDate } from '../../../utils/formatDate';
import FilterDropdown from '../../../components/FilterDropdown';
import ApplicantCard from '../../../components/TeamManagerCard/ApplicantCard';
import '../Placeholders.scss';
import './Applications.scss';
import ApplicationAcceptanceConfirmationModal from '../../../components/TeamManagerCard/ApplicationAcceptanceConfirmationModal';
import Placeholder from '../Placeholder/Placeholder';

export default class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApplication: false,
      application: {},
      filteredApplications: [],
      currentRole: 'All Roles',
      openModal: false,
      showConfirmationResponse: false
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

  componentDidUpdate(prevProps) {
    const {
      applications: { error, acceptLoading }
    } = this.props;
    if (
      prevProps.applications.acceptLoading !== acceptLoading &&
      prevProps.applications.error !== error
    ) {
      this.showConfirmationResponse();
    }
  }

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
        <div className="mb-4 mr-5" key={application.id}>
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
      <Placeholder text="You currently have no applications for any role." />
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
        <ApplicantCard
          application={application}
          acceptApplicationHandler={this.toggle}
        />
      </div>
    );
  };

  /**
   * Returns the card containing details about an applicant after being clicked
   * @param application
   */
  acceptApplicationHandler = async applicationId => {
    const { acceptApplication } = this.props;
    await acceptApplication(applicationId);
  };

  toggle = () => {
    const { openModal } = this.state;
    this.setState({ openModal: !openModal });
  };

  showConfirmationModal = () => {
    const { openModal, application, showConfirmationResponse } = this.state;
    const { applicant, project, role } = application;
    const {
      applications: { acceptLoading, error }
    } = this.props;

    return (
      <ApplicationAcceptanceConfirmationModal
        openModal={openModal}
        acceptApplication={this.acceptApplicationHandler}
        applicationId={application.id}
        toggleModal={this.toggle}
        name={this.formatName(applicant.first_name, applicant.last_name)}
        projectName={project.name}
        role={role.name}
        loading={acceptLoading}
        acceptanceSuccess={showConfirmationResponse}
        hideConfirmationResponse={this.hideConfirmationResponse}
        showSuccess={this.showConfirmationResponse}
        error={error}
      />
    );
  };

  showConfirmationResponse = () => {
    this.setState({ showConfirmationResponse: true });
  };

  hideConfirmationResponse = () => {
    this.setState({ showConfirmationResponse: false, showApplication: false });
  };

  render() {
    const {
      applications: { loading }
    } = this.props;

    const {
      showApplication,
      application,
      filteredApplications,
      currentRole,
      openModal
    } = this.state;

    return loading ? (
      <div className="cadre__page">
        <PMloader />
      </div>
    ) : (
      <div className="applications-wrapper">
        <div className="cadre__page application__page">
          <div className="tm-project-applications">
            <div
              className={`all-applicants-cards d-flex flex-wrap ${
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
        {openModal && this.showConfirmationModal()}
      </div>
    );
  }
}

Applications.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  applications: PropTypes.object.isRequired,
  fetchApplications: PropTypes.func.isRequired,
  acceptApplication: PropTypes.func.isRequired
};
