import React from 'react';
import { shallow } from 'enzyme';
import MyTeams from '../MyTeams';

describe('Application component', () => {
  let wrapper;
  const defaultProps = {
    fetchTeamMembers: jest.fn(),
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
              project_id: 24,
              project_role_id: 5,
              role_history: [
                {
                  project_id: 24,
                  project_role_id: 5,
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
  beforeEach(() => {
    wrapper = shallow(<MyTeams {...defaultProps} />);
  });

  it('renders teams member cards', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
