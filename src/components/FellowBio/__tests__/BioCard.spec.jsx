import React from 'react';
import { shallow } from 'enzyme';
import BioCard from '../BioCard';

describe('tests the project card', () => {
  const props = {
    data: {
      fellow: {
        fellow_id: '-LJK1qECFdekucrwqqkh',
        manager_id: '-LGy4OuPDHCZCZvDuPz0',
        project: 'Watch Tower',
        name: 'Cristian Bartell',
        bio: '',
        email: 'cristian.bartell@andela.com',
        location: 'Kampala',
        level: 'D0B',
        start_date: null,
        cohort: 'Class 10 - KLA',
        lms_id: 1471,
        details: {
          expectedApprenticeshipStartDate: '2018-09-17',
          apprenticeshipTeam: 'Watch Tower',
          actualApprenticeshipStartDate: '2018-12-15',
          expectedApprenticeshipCompletionDate: '2019-03-11',
          apprenticeshipManager: 'Trust Birungi'
        }
      },
      loading: false
    }
  };

  it('renders correctly when loading is false', () => {
    const wrapper = shallow(<BioCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when loading is true', () => {
    const wrapper = shallow(<BioCard data={{ fellow: {}, loading: true }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
