import React from 'react';
import { shallow } from 'enzyme';
import EngineerCard from '../EngineerCard';

describe('tests the Engineer card', () => {
  const props = {
    data: {
      fellow: {
        fellow_id: '-LJK1qECFdekucrwqqkh',
        manager_id: '-LGy4OuPDHCZCZvDuPz0',
        first_name: 'Cristian',
        last_name: 'Bartell',
        sims_start_date: '',
        sims_end_date: '',
        sims_project: 'AuthorsHaven',
        sims_project_technology: 'Python/Django',
        apprenticeship_start_date: '',
        apprenticeship_end_date: '',
        apprenticeship_project: 'WatchTower',
        apprenticeship_technology: 'PHP/JavaScript'
      },
      loading: false
    }
  };

  it('renders correctly when loading is false', () => {
    const wrapper = shallow(<EngineerCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when fellow data not passed [Return null view]', () => {
    const wrapper = shallow(<EngineerCard data={{ loading: true }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when loading is true', () => {
    const wrapper = shallow(
      <EngineerCard data={{ fellow: {}, loading: true }} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
