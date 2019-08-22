import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import weakKey from 'weak-key';
import TeamCard from '../../../components/TeamManagerCard';
import StackRectangle from '../../../components/StackRectangle';
import CustomLoader from '../../../components/CustomLoader/PMLoader';
import FilterDropdown from '../../../components/FilterDropdown';
import managerTeamData from '../../../__mocks__/managerTeamData';
import { altDate as formatDate } from '../../../utils/formatDate';

const MyTeam = ({ fetchTeamMembers, teamManagerTeamMembers }) => {
  const [filterRole, setFilterRole] = useState('All Roles');
  useEffect(() => {
    fetchTeamMembers();
    // eslint-disable-next-line
  }, []);

  const getTeamData = data =>
    data.map(project =>
      project.engineers.map(member => {
        const currentRole = member.role_history.find(
          roleDetail => roleDetail.is_active === true
        );
        return {
          image: member.picture,
          name: `${member.first_name} ${member.last_name}`,
          role: currentRole.role.name,
          cohort: member.cohort,
          date: formatDate(currentRole.end_date),
          project: project.name
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

  const flatData = (accumulator, currentValue) =>
    accumulator.concat(currentValue);

  const mapTeamCards = teamData => {
    const extractedData = getTeamData(teamData).reduce(flatData, []);
    const sortedData = sortTeamData(extractedData);
    const filteredData =
      filterRole === 'All Roles'
        ? sortedData
        : sortedData.filter(teamMember => teamMember.role === filterRole);

    const teamMembers = filteredData.map(data => (
      <TeamCard
        image={data.image}
        name={data.name}
        role={data.role}
        cohort={data.cohort}
        date={data.date}
        project={data.project}
        key={weakKey(data)}
      />
    ));
    return teamMembers.length ? (
      teamMembers
    ) : (
      <h1>You have zero team members</h1>
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

  const renderComponents = () => {
    if (teamManagerTeamMembers.data[0].projects.length) {
      const engineersRoles = getRoles(teamManagerTeamMembers.data[0].projects);
      return (
        <div className="cadre__page managerTeamMembers">
          <div className="teamTitle">
            <div>
              <h1>{renderTitle(teamManagerTeamMembers.data[0].projects)}</h1>
              <div className="technologies">
                {renderTechnologies(teamManagerTeamMembers.data[0].projects)}
              </div>
            </div>

            <FilterDropdown
              items={engineersRoles}
              current={filterRole}
              width="400"
              chevronColor="#808FA3"
              dropdownBackgroundColor="#FFFFFF"
              getFilter={(type, value) => setFilterRole(value)}
            />
          </div>
          <div className="teamMembers">
            {mapTeamCards(teamManagerTeamMembers.data[0].projects)}
          </div>
        </div>
      );
    }
    return <h1>You currently not managing any project</h1>;
  };

  return !teamManagerTeamMembers.data.length ? (
    <CustomLoader />
  ) : (
    renderComponents()
  );
};

MyTeam.defaultProps = {
  teamManagerTeamMembers: managerTeamData
};

MyTeam.propTypes = {
  fetchTeamMembers: PropTypes.func.isRequired,
  teamManagerTeamMembers: PropTypes.shape()
};

export default MyTeam;
