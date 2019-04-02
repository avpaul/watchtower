import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ManagerFellowMap from '../../../components/ManagerFellowMap';
import fellowManagers from '../../../__mocks__/fellowManagers';
import OpsDashboard from '../index';
import OpsDashboardMain from '../OpsDashboard';
import ManagerFellowSortInput from '../../../components/ManagerFellowMap/ManagerFellowSortInput';

describe('OpsDashboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter initialEntries={['/dashboard']}>
        <OpsDashboard
          user={{ name: 'test', picture: 'http://' }}
          role="WATCH_TOWER_OPS"
        />
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

describe('OpsDashboardMain component', () => {
  const setup = () => {
    const spyResolve = jest.fn().mockImplementation(() =>
      Promise.resolve({
        error: false,
        managers: {
          lfs: fellowManagers.lfs,
          ttls: fellowManagers.ttls
        }
      })
    );

    const props = {
      ttls: fellowManagers.ttls,
      lfs: fellowManagers.lfs,
      getManagers: spyResolve,
      fetchFellowsSummary: jest.fn,
      show: true,
      displayManagers: 'LF',
      managerFellowSortRatio: 'HIGH_TO_LOW',
      averageFellowsPerLf: 22,
      averageFellowsPerTtl: 20,
      user: { name: 'test', picture: 'http://' }
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
    const { wrapper } = setup();
    wrapper.setState({ show: true });
    const managerFellowSortInput = wrapper
      .find(ManagerFellowMap)
      .dive()
      .find(ManagerFellowSortInput);

    managerFellowSortInput.simulate(
      'change',
      'lfFellowRatio',
      'Fellow Ratio, Low to High'
    );
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
    const { wrapper, props } = setup();
    wrapper.setProps({ ttls: [], lfs: [] });
    wrapper.instance().componentDidMount();
    expect(props.getManagers).toHaveBeenCalled();
  });

  it('should change map to display base on the map card clicked', () => {
    const { wrapper } = setup();
    wrapper
      .find('DisplayCard')
      .first()
      .simulate('click', { currentTarget: { id: '0' } });
    expect(wrapper.state('displayManagers')).toBe('LF');
    wrapper
      .find('DisplayCard')
      .first()
      .simulate('click', { currentTarget: { id: '1' } });
    expect(wrapper.state('displayManagers')).toBe('TTL');
  });
});
