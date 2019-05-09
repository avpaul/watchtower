import React from 'react';
import { shallow } from 'enzyme';
import { FellowsProgress } from '..';
import fellowManagersMock from '../../../../__mocks__/fellowManagers';

describe('FellowProgress', () => {
  const props = {
    lfs: fellowManagersMock.lfs,
    ttls: fellowManagersMock.ttls,
    fellowsProgress: {
      data: {
        fellowsProgressD0A: [
          {
            'On Track': 2,
            'Off Track': 1,
            PIP: 1,
            week: '10-Sep-2018'
          }
        ],
        fellowsProgressD0B: [],
        fellowsProgress: []
      }
    },
    locations: [],
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
    expect(props.getFellowProgress).toHaveBeenCalled();
  });

  it('Should update state on getFilter', () => {
    wrapper.instance().getFilter('lfTtl', props.ttls[0].name);
    expect(wrapper.state().lfTtl).toEqual(props.ttls[0]);
    wrapper.instance().getFilter('location', 'NOB');
    expect(wrapper.state().location).toEqual('NOB');
    wrapper.instance().getFilter('invalid', 'value');
    expect(wrapper.state().location).toEqual('NOB');
    expect(props.getFellowProgress).toHaveBeenCalled();
  });

  it('Filter should set All if ttl not found', () => {
    wrapper.instance().getFilter('lfTtl', '404');
    expect(wrapper.state().lfTtl).toEqual('All');
  });
});
