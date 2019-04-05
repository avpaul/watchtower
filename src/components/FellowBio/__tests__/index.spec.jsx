import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import FellowBio, { FellowBioConnected } from '../index';

describe('tests the index component', () => {
  it('renders correctly', () => {
    const props = {
      fellow: {
        loading: true,
        fellow: {}
      },
      getFellowBioAction: jest.fn(),
      user: {
        email: 'roni@mail.com'
      }
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore({ fellow: { fellow: {} } });
    const wrapper = shallow(<FellowBioConnected {...props} store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Fellow Bio is mounted correctly', () => {
    const props = {
      fellow: {
        loading: true,
        fellow: {}
      },
      getFellowBioAction: jest.fn(),
      user: {
        email: 'roni@mail.com'
      }
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore({ fellow: { fellow: {} } });
    const wrapper = shallow(<FellowBioConnected {...props} store={store} />);
    expect(wrapper.find('FellowBio')).toHaveLength(1);
  });
  it('Fellow Bio is mounted correctly', () => {
    const props = {
      fellow: {
        loading: true,
        fellow: {}
      },
      getFellowBioAction: jest.fn(),
      user: {
        email: 'roni@mail.com'
      }
    };
    const wrapper = shallow(<FellowBio {...props} />);
    expect(wrapper.find('BioCard')).toHaveLength(1);
  });
});
