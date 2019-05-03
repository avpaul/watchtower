import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../../redux/reducers/initialState';
import PipActivationForm from '..';
import PipActivationFormContainer, {
  mapStateToProps
} from '../PipActivationFormContainer';

const initState = initialState;
const mockStore = configureStore();
let store;

describe('Tests on PipActivationFormContainer component', () => {
  let wrapper;

  beforeEach(() => {
    store = mockStore(initState);
    wrapper = shallow(
      <PipActivationFormContainer
        store={store}
        user="brian.mboya@andela.com"
        data={{}}
        loading={false}
        error={null}
        fellow={{
          apprEndDate: '2018-12-11',
          apprStartDate: '2018-09-17',
          devPulseAverage: '0.79',
          email: 'folajimi.ogunbadejo@andela.com',
          firstName: 'Folajimi',
          lastName: 'Ogunbadejo',
          level: 'D0B Apprenticeship',
          lmsOutput: '18/18',
          picture:
            'https://lh3.googleusercontent.com/-8BkooUuxfYk/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-i_7lhYj8D3RGxH28UQBPAbdtgxpw/mo/photo.jpg?sz=50',
          project: 'Watch Tower',
          simsEndDate: null,
          simsStartDate: null,
          status: 'gteWk5OffTrack'
        }}
        averageRatings={{
          communication: '0.00',
          initiative: '1.33',
          integration: '1.00',
          levelReturned: 'D0B Apprenticeship',
          professionalism: '0.00',
          quality: '1.00',
          quantity: '1.41'
        }}
      />
    );
  });

  it('should render snapshots correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should mapState to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('should render PipActivationForm component', () => {
    expect(PipActivationForm).toBeDefined();
  });

  it('should hold initial state for component', () => {
    expect(wrapper.props().loading).toEqual(false);
    expect(wrapper.props().data).toEqual({});
    expect(wrapper.props().error).toEqual(null);
  });
});
