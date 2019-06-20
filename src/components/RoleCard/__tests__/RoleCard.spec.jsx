import React from 'react';
import { shallow } from 'enzyme';
import RoleCard from '../RoleCard';

let props;
let wrapper;

describe('Test Role Card component', () => {
  it('should render role card instance properly', () => {
    props = {
      role: {
        id: 1,
        name: 'test role',
        description: 'test role description',
        active_engineers_count: 1,
        vacancies: [{ available_slots: 2 }],
        created_at: '2019-06-04 04:56:39',
        updated_at: '2019-06-04 04:56:39'
      }
    };
    wrapper = shallow(<RoleCard {...props} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle click correctly', () => {
    wrapper.find('.role-card__attributes-seemore').simulate('click');
    expect(wrapper.state('showMore')).toBeTruthy();
  });
});
