import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import ManagerMapCard from '..';
import fellowManagers from '../../../../__mocks__/fellowManagers';

const fellowManager = fellowManagers.ttls[0];

const props = {
  manager: fellowManager
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManagerMapCard {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders ManagerMap cards', () => {
  const wrapper = mount(<ManagerMapCard {...props} />);
  expect(wrapper.find('.manager-card')).toBeDefined();
});

it('renders blue bullet', () => {
  props.manager = {
    staff_id: '-KmRUHvf0LMutnbAhjp5',
    name: 'Joshua Ocero',
    email: 'joshua.ocero@andela.com',
    role: 'TTL',
    manager_id: '-KXGy1MT1oimjQgFim8t',
    fellows_count: 18,
    fellows: [
      {
        email: 'fellow@gmail.com',
        status: {
          id: 130,
          fellow_id: '-LONlWzMsXN59jtVjB7U',
          pulse: 'onTrack',
          lms: 'onTrack',
          overall: 'onTrack'
        }
      }
    ]
  };
  const wrapper = mount(<ManagerMapCard {...props} />);
  expect(wrapper.find('.dots')).toBeDefined();
});

it('renders yellow bullet on OPs dashboard', () => {
  props.manager = {
    staff_id: '-KmRUHvf0LMutnbAhjp5',
    name: 'Joshua Ocero',
    email: 'joshua.ocero@andela.com',
    role: 'TTL',
    manager_id: '-KXGy1MT1oimjQgFim8t',
    fellows_count: 18,
    fellows: [
      {
        email: 'fellow@gmail.com',
        status: {
          id: 130,
          fellow_id: '-LONlWzMsXN59jtVjB7U',
          pulse: 'onTrack',
          lms: 'offTrack',
          overall: 'offTrack'
        }
      }
    ]
  };
  const wrapper = mount(<ManagerMapCard {...props} />);
  expect(wrapper.find('.dot')).toBeDefined();
});

it('renders bullet on EM dashboard', () => {
  props.manager = {
    staff_id: '-KmRUHvf0LMutnbAhjp5',
    name: 'Joshua Ocero',
    email: 'joshua.ocero@andela.com',
    role: 'TTL',
    manager_id: '-KXGy1MT1oimjQgFim8t',
    fellows_count: 18,
    fellows: [
      {
        email: 'fellow@gmail.com',
        overall_status: 'onTrack'
      }
    ]
  };
  const wrapper = mount(<ManagerMapCard {...props} />);
  expect(wrapper.find('.dot')).toBeDefined();
});
