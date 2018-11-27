import React from 'react';
import { shallow } from 'enzyme';
import { FellowsProgress } from '..';

describe('FellowProgress', () => {
  const getTTLSpy = jest.fn();
  const props = {
    ttls: {
      ttls: [
        {
          staffId: 'UGD/TTL/2135',
          firstName: 'Test',
          lastName: 'TTL',
          email: 'test.ttl@andela.com',
          role: 'Technical Team Lead'
        }
      ]
    },
    fellowsProgress: {
      data: {
        fellowsProgressD0A: [],
        fellowsProgressD0B: [],
        fellowsProgress: []
      }
    },
    locations: { locations: [] },
    getTTLs: getTTLSpy,
    getLocations: jest.fn(),
    getFellowProgress: jest.fn()
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FellowsProgress {...props} ttls={props.ttls} />);
  });

  it('it renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('Should call api on mount', () => {
    wrapper.instance().componentDidMount();
    expect(props.getTTLs).toHaveBeenCalled();
    expect(props.getLocations).toHaveBeenCalled();
    expect(props.getFellowProgress).toHaveBeenCalled();
  });

  it('Should update state on getFilter', () => {
    wrapper.instance().getFilter('ttl', 'Test TTL');
    expect(wrapper.state().ttl).toEqual(props.ttls.ttls[0]);
    wrapper.instance().getFilter('location', 'NOB');
    expect(wrapper.state().location).toEqual('NOB');
    expect(props.getFellowProgress).toHaveBeenCalled();
  });

  it('Filter should set All if ttl not found', () => {
    wrapper.instance().getFilter('ttl', '404');
    expect(wrapper.state().ttl).toEqual('All');
  });
});
