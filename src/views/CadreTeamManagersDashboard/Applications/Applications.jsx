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
// import '../../../components/FilterDropdown/index.scss';
import ApplicationAcceptanceConfirmationModal from '../../../components/TeamManagerCard/ApplicationAcceptanceConfirmationModal';
import Placeholder from '../Placeholder/Placeholder';
import { isEmpty } from '../../../utils';

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
   * @returns {array} roles
   * @param applications
   */

  getRoles = applications => {
    let roles = ['All Roles'];
    if (applications.length > 0) {
      roles = applications.reduce(
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
   * @param allApplications
   * @param filter
   * @param current
   */

  renderHeader = (applications, allApplications, filter, current) => {
    const filterItems = this.getRoles(allApplications.pending || []);
    const { showApplication } = this.state;
    const totalApplications =
      !isEmpty(applications) && applications.length > 0
        ? applications.length
        : 0;
    return (
      <div className="row w-100 mb-4">
        <div
          className={`stats-header ${
            showApplication ? 'col-md-8' : 'col-md-10'
          }`}
        >
          <div>{String(totalApplications).concat(' Pending Applications')}</div>
        </div>
        <div className={`${showApplication ? 'col-md-4' : 'col-md-2'}`}>
          <FilterDropdown
            items={filterItems}
            current={current}
            width="400"
            chevronColor="#808FA3"
            dropdownBackgroundColor="#FFFFFF"
            getFilter={(type, value) => filter(value)}
          />
        </div>
      </div>
    );
  };

  /**
   * Returns the card containing details about an applicant after being clicked
   * @param e
   * @param application
   */
  fetchSingleApplication = (e, application) => {
    this.setState({ showApplication: true, application });
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
          apprenticeship_end_date: endDate
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
            dateType="Appr. End Date"
            date={formatDate(endDate)}
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
          hideDrawer={this.hideConfirmationResponse}
        />
      </div>
    );
  };

  /**
   * Returns the card containing details about an applicant after being clicked
   * @param applicationId
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
    const {
      openModal,
      application,
      showConfirmationResponse,
      filteredApplications
    } = this.state;
    const { applicant, project, role } = application;
    const {
      applications: { acceptLoading, error, acceptedApplication }
    } = this.props;

    return (
      <ApplicationAcceptanceConfirmationModal
        openModal={openModal}
        acceptApplication={this.acceptApplicationHandler}
        applicationId={application.id}
        applications={filteredApplications}
        toggleModal={this.toggle}
        name={this.formatName(applicant.first_name, applicant.last_name)}
        projectName={project.name}
        role={role.name}
        loading={acceptLoading}
        acceptanceSuccess={showConfirmationResponse}
        hideConfirmationResponse={this.hideConfirmationResponse}
        showSuccess={this.showConfirmationResponse}
        error={error}
        slots={acceptedApplication ? acceptedApplication.slots : 0}
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
      applications: { loading, data }
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
                data,
                this.filterByRole,
                currentRole
              )}
              {this.mapTeamApplications(filteredApplications || [])}
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
