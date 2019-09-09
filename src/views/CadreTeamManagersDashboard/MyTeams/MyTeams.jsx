import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import weakKey from 'weak-key';
import TeamCard from '../../../components/TeamManagerCard';
import { CadreMainButton } from '../../../components/Buttons';
import StackRectangle from '../../../components/StackRectangle';
import CustomLoader from '../../../components/CustomLoader/PMLoader';
import FilterDropdown from '../../../components/FilterDropdown';
import ProfileContainer from '../../../components/EngineerBio/ProfileContainer';
import Placeholder from '../Placeholder/Placeholder';
import Modal from '../../../components/LargeModal/LargeModal';
import Loader from '../../../components/Loader/Loader';
import managerTeamData from '../../../__mocks__/managerTeamData';
import RequestNewTeamMemberModal from './RequestNewTeamMemberModal';
import { altDate as formatDate } from '../../../utils/formatDate';

import './MyTeams.scss';

const MyTeam = ({
  fetchTeamMembers,
  teamManagerTeamMembers,
  rollOffAnEngineer,
  rollOffEngineerStatus
}) => {
  const [filterRole, setFilterRole] = useState('All Roles');
  const [isOpen, setIsOpen] = useState(false);
  const [fellow, setFellow] = useState({});
  const [rollOffModalIsOpen, setRollOffModalIsOpen] = useState(false);
  const [rollingOff, setRollingOff] = useState(false);

  const toggleRollOffModal = () => {
    setRollOffModalIsOpen(!rollOffModalIsOpen);
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchTeamMembers();
    if (
      rollingOff &&
      rollOffEngineerStatus.data.message === 'roll off successful'
    ) {
      closeDrawer();
      toggleRollOffModal();
      setRollingOff(false);
    }
    // eslint-disable-next-line
  }, [rollOffEngineerStatus.data]);

  const getTeamData = data =>
    data.map(project =>
      project.engineers.map(member => {
        const currentRole = member.role_history.find(
          roleDetail => roleDetail.is_active === true
        );
        return {
          ...member,
          role: currentRole.role.name,
          date: formatDate(currentRole.end_date),
          project: project.name,
          name: `${member.first_name} ${member.last_name}`
        };
      })
    );

  const sortTeamData = teamData =>
    teamData.sort((a, b) => {
      if (a.project.localeCompare(b.project) === 0) {
        return a.name.localeCompare(b.name);
      }
      return a.project.localeCompare(b.project);
    });

  const showProfile = data => {
    setFellow(data);
    openDrawer();
  };

  const flatData = (accumulator, currentValue) =>
    accumulator.concat(currentValue);

  const formatName = (firstName, lastName) => firstName.concat(' ', lastName);

  const emptyPlaceholder = () => (
    <div>
      <Placeholder text="Welcome, you are yet to have Cadre Engineers on your team." />
    </div>
  );

  const mapTeamCards = teamData => {
    const extractedData = getTeamData(teamData).reduce(flatData, []);
    const sortedData = sortTeamData(extractedData);
    const filteredData =
      filterRole === 'All Roles'
        ? sortedData
        : sortedData.filter(teamMember => teamMember.role === filterRole);

    const teamMembers = filteredData.map(data => (
      <TeamCard
        event={() => showProfile(data)}
        image={data.picture}
        key={weakKey(data)}
        name={formatName(data.first_name, data.last_name)}
        cohort={data.cohort}
        project={data.project}
        role={data.role}
        date={formatDate(data.role_history[0].end_date)}
      />
    ));
    return teamMembers.length !== 0 ? (
      <div className="teamMembers">{teamMembers}</div>
    ) : (
      emptyPlaceholder()
    );
  };

  const renderTechnologies = teamData =>
    teamData.map(project =>
      project.technologies.length
        ? project.technologies.map(tech => (
            <StackRectangle stackName={tech.name} key={weakKey(tech)} />
          ))
        : ''
    );

  const renderTitle = teamData => {
    if (teamData.length === 1) {
      return `${teamData[0].name} Team`;
    }
    return 'My Teams';
  };

  const getRoles = managerProjects => {
    let roles = [];
    managerProjects.forEach(({ engineers }) => {
      roles = engineers.reduce(
        (accumulator, engineer) => {
          const { name: roleName } = engineer.role_history[0].role;
          if (accumulator.includes(roleName)) return accumulator;
          accumulator.push(roleName);
          return accumulator;
        },
        ['All Roles']
      );
    });
    return roles;
  };

  const profileCard = () => (
    <div
      className={`bio-card no-radius ${
        isOpen ? 'show-profile' : 'hide-profile'
      }`}
    >
      <span className="close" aria-hidden="true" onClick={closeDrawer}>
        &times;
      </span>
      <ProfileContainer
        fellow={fellow}
        rollOffHandler={toggleRollOffModal}
        view="teamManager"
      />
    </div>
  );

  const handleRollOff = () => {
    setRollingOff(true);
    rollOffAnEngineer(fellow.fellow_id);
    // eslint-disable-next-line no-lone-blocks
  };
  const renderConfirnRollOffModal = () => (
    <Modal
      handleClose={toggleRollOffModal}
      show={rollOffModalIsOpen}
      showBtn={false}
      size="small"
    >
      <React.Fragment>
        <div>
          Are you sure you want to roll off {fellow.first_name}{' '}
          {fellow.last_name}?
        </div>
        <div className="text-white mt-5">
          {rollOffEngineerStatus.loading ? (
            <span className="roll-off-loader">
              <Loader size="small" />
            </span>
          ) : (
            <button
              type="button"
              onClick={handleRollOff}
              className="mr-4 py-2 text-uppercase px-4 accept-btn btn confirmRollOffButton accepting-btns"
            >
              {' '}
              Roll Off{' '}
            </button>
          )}
          <button
            type="button"
            onClick={toggleRollOffModal}
            className="btn accepting-btns btn-secondary text-uppercase py-2 px-4 reject-btn"
          >
            {' '}
            Cancel{' '}
          </button>
        </div>
      </React.Fragment>
    </Modal>
  );

  const renderComponents = () => {
    if (teamManagerTeamMembers.data[0].projects.length) {
      const engineersRoles = getRoles(teamManagerTeamMembers.data[0].projects);
      return (
        <Fragment>
          <RequestNewTeamMemberModal />
          <div
            className={`cadre__page managerTeamMembers ${
              isOpen ? 'add-margin' : 'remove-margin'
            }`}
          >
            <div className="teamTitle">
              <div>
                <h1>{renderTitle(teamManagerTeamMembers.data[0].projects)}</h1>
                <div className="technologies">
                  {renderTechnologies(teamManagerTeamMembers.data[0].projects)}
                </div>
              </div>
              <div className="row float-right">
                <div className="col-md-6">
                  <FilterDropdown
                    items={engineersRoles}
                    current={filterRole}
                    width="400"
                    chevronColor="#808FA3"
                    dropdownBackgroundColor="#FFFFFF"
                    getFilter={(type, value) => setFilterRole(value)}
                  />
                </div>
                <div className="col-md-6">
                  <CadreMainButton
                    buttonProps={{
                      'data-toggle': 'modal',
                      'data-target': '#requestNewTeamMemberModal'
                    }}
                    label="NEW REQUEST"
                  />
                </div>
              </div>
            </div>
            {mapTeamCards(teamManagerTeamMembers.data[0].projects)}
          </div>
          {profileCard()}
          {renderConfirnRollOffModal()}
        </Fragment>
      );
    }
    return <div className="cadre__page">{emptyPlaceholder()}</div>;
  };

  return !teamManagerTeamMembers.data.length ? (
    <CustomLoader />
  ) : (
    renderComponents()
  );
};

MyTeam.defaultProps = {
  teamManagerTeamMembers: managerTeamData,
  rollOffEngineerStatus: {
    loading: false,
    data: {
      fellow_id: 'jghferhbj'
    }
  },
  rollOffAnEngineer: () => ''
};

MyTeam.propTypes = {
  history: PropTypes.shape({}).isRequired,
  fetchTeamMembers: PropTypes.func.isRequired,
  teamManagerTeamMembers: PropTypes.shape(),
  rollOffAnEngineer: PropTypes.func,
  rollOffEngineerStatus: PropTypes.shape()
};

export default MyTeam;
