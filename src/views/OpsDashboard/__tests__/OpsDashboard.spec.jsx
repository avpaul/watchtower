import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import fellowManagers from '../../../__mocks__/fellowManagers';
import OpsDashboard from '..';
import { OpsDashboardMain } from '../OpsDashboard';

describe('OpsDashboard component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Router>
          <OpsDashboard
            user={{ name: 'test', picture: 'http://' }}
            role="WATCH_TOWER_OPS"
          />
        </Router>
      </MemoryRouter>
    );
  });

  it('matchs correctly', () => {
    expect(
      wrapper
        .find(OpsDashboard)
        .dive()
        .name()
    ).toBe('Route');
  });
});

describe('OpsDashboard component', () => {
  const setup = () => {
    const spyResolve = sinon.spy(() =>
      Promise.resolve({ data: { error: false } })
    );
    const props = {
      ttls: fellowManagers.ttls,
      lfs: fellowManagers.lfs,
      getManagers: spyResolve,
      show: true,
      displayManagers: 'LF',
      managerFellowSortRatio: 'HIGH_TO_LOW'
    };

    const wrapper = shallow(<OpsDashboardMain {...props} />);

    return {
      props,
      wrapper,
      spyResolve
    };
  };

  it('renders to match snapshot', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('changes manager to fellow ratio when select changed', () => {
    const mockedEvent = {
      target: {
        value: 'LOW_TO_HIGH'
      }
    };
    const { wrapper } = setup();
    wrapper.setState({ managerFellowSortRatio: 'HIGH_TO_LOW' });
    const onSelectManagerFellowRatioSpy = jest.spyOn(
      wrapper.instance(),
      'onSelectManagerFellowRatio'
    );
    wrapper.instance().onSelectManagerFellowRatio(mockedEvent);
    expect(onSelectManagerFellowRatioSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().managerFellowSortRatio).toBe('LOW_TO_HIGH');
  });

  it('closes the map when the close button is clicked', () => {
    const { wrapper } = setup();
    wrapper.setState({ show: true });
    const handleMapCloseSpy = jest.spyOn(wrapper.instance(), 'handleMapClose');

    wrapper.instance().handleMapClose();
    expect(handleMapCloseSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().show).toBe(false);
  });

  it('should fetch managers data when data is not in store', () => {
    const { wrapper, spyResolve } = setup();
    wrapper.setProps({ ttls: [] });
    wrapper.instance().componentDidMount();
    expect(spyResolve.called).toBe(true);
  });
});
