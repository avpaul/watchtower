import React from 'react';
import { shallow } from 'enzyme';
import RoleCard from '../RoleCard';
import Modal from '../../LargeModal/LargeModal';

let props;
let wrapper;

describe('Test Role Card component', () => {
  props = {
    role: {
      id: 1,
      name: 'test role',
      description:
        'test role description should render role card instance properly should render role card instance properly',
      active_engineers_count: 1,
      vacancies_count: 3,
      applications_count: 2,
      created_at: '2019-06-04 04:56:39',
      updated_at: '2019-06-04 04:56:39'
    },
    fetchActiveEngineers: jest.fn(),
    loading: false,
    activeEngineers: {}
  };
  it('should render role card instance properly', () => {
    wrapper = shallow(<RoleCard {...props} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render modal', () => {
    props = { ...props, loading: true };

    wrapper = shallow(<RoleCard {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should handle click correctly', () => {
    wrapper.find('.role-card__attributes-seemore').simulate('click');
    expect(wrapper.state('showMore')).toBeTruthy();
  });
  it('should handle click count correctly', () => {
    wrapper
      .find('.role-card__attributes-count')
      .at(1)
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle close modal correctly', () => {
    wrapper
      .find(Modal)
      .dive()
      .find('.close')
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
