import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TeamCard from '../../../components/TeamManagerCard';
import StackRectangle from '../../../components/StackRectangle';
import { altDate as formatDate } from '../../../utils/formatDate';

const MyTeam = ({ fetchTeamMembers, teamManagerTeamMembers }) => {
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
          event: () => '',
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
    return sortedData.map(data => (
      <TeamCard
        event={() => ''}
        image={data.image}
        name={data.name}
        role={data.role}
        cohort={data.cohort}
        date={data.date}
        project={data.project}
      />
    ));
  };

  const renderTechnologies = teamData =>
    teamData.map(project =>
      project.technologies.map(tech => <StackRectangle stackName={tech.name} />)
    );
  return (
    <div className="cadre__page managerTeamMembers">
      <div className="teamTitle">
        <h1>My Team</h1>
        <div className="technologies">
          {renderTechnologies(teamManagerTeamMembers.data)}
        </div>
      </div>
      <div className="teamMembers">
        {mapTeamCards(teamManagerTeamMembers.data)}
      </div>
    </div>
  );
};

MyTeam.defaultProps = {
  fetchTeamMembers: () => '',
  teamManagerTeamMembers: {
    data: [
      {
        name: 'WatchTower',
        technologies: [
          {
            name: 'React-JS'
          }
        ],
        engineers: [
          {
            first_name: 'john',
            last_name: 'doe',
            picture: 'https://lorempixel.com',
            cohort: 'NBO-13',
            role_history: [
              {
                is_active: true,
                end_date: '2019-11-20 13:04:28',
                role: {
                  name: 'Technical Coordinator'
                }
              }
            ]
          }
        ]
      }
    ]
  }
};

MyTeam.propTypes = {
  fetchTeamMembers: PropTypes.func,
  teamManagerTeamMembers: PropTypes.shape()
};

export default MyTeam;
