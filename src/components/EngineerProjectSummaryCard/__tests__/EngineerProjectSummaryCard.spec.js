import React from 'react';
import { shallow } from 'enzyme';

import EngineerProjectSummaryCard from '../EngineerProjectSummaryCard';

describe('tests for d1 fellow current project summary', () => {
  const props = {
    profile: {
      role: {
        name: 'Dev'
      },
      project: {
        about: 'This is watchtower',
        channels: null,
        created_at: '2019-06-13 13:23:33',
        id: 1,
        logo: null,
        manager: {
          created_at: '2019-06-13 13:24:23',
          email: 'grace@andela.com',
          id: 1,
          name: 'Grace',
          picture: 'hashdfj.jpg',
          updated_at: '2019-06-13 13:24:23'
        },

        mockups: null,
        name: 'WatchTower',
        tagline: 'This is watchtower',
        technologies: ['PHP/Laravel', 'ReactJS'],
        type: 'internal',
        updated_at: '2019-06-13 13:23:33'
      }
    }
  };

  it('renders correctly given the props', () => {
    const wrapper = shallow(
      <EngineerProjectSummaryCard profile={props.profile} />
    );
    const span = wrapper.find('.header-span');
    expect(span).toBeDefined();
  });

  it('renders correctly given the props', () => {
    const wrapper = shallow(<EngineerProjectSummaryCard profile={{}} />);
    const noProjectContainer = wrapper.find('no-project-container');
    expect(noProjectContainer).toBeDefined();
  });

  it('renders the correct manager details for Engineer role', () => {
    const wrapper = shallow(
      <EngineerProjectSummaryCard
        profile={{ ...props.profile, role: { name: 'Engineer' } }}
      />
    );

    const correctManagerName = wrapper.find('.manager-name').text();
    const correctManagerMail = wrapper.find('.manager-email').text();

    expect(correctManagerName).toBe('Grace');
    expect(correctManagerMail).toBe('grace@andela.com');
  });
});
