import React from 'react';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../../redux/reducers/initialState';
import PrePipNotificationForm from '../PrePipNotificationForm';
import PrePipNotificationFormContainer from '../PrePipNotificationFormContainer';

jest.mock('html2canvas', () =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      toDataURL: () => {}
    })
  )
);

jest.mock('jspdf', () =>
  jest.fn().mockImplementation(() => ({
    internal: { pageSize: { getWidth: () => 2 } },
    addImage: () => jest.fn(),
    save: () => {}
  }))
);

describe('Pre pip notification form', () => {
  const mockStore = configureStore();
  let store;
  let wrapper;
  let containerWrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    const props = {
      fellowFeedback: {
        fellowFeedback: {},
        Attribute: null,
        Context: 'Hi Sinmiloluwa',
        Criteria: 'lms',
        name: 'Oloyede Sinmiloluwa',
        Manager: {
          name: 'Trust Birungi',
          email: 'trust.birungi@andela.com'
        },
        Recommendation: null,
        index: '0'
      },
      history: []
    };

    wrapper = shallow(<PrePipNotificationForm store={store} {...props} />);
    containerWrapper = shallow(
      <PrePipNotificationFormContainer store={store} />
    );
  });

  it('renders to match shapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(containerWrapper).toMatchSnapshot();
  });

  it('renders details as expected', () => {
    wrapper.instance().printDocument();
    wrapper.instance().createPdf('0x64');
    expect(html2canvas).toHaveBeenCalled();
    expect(jspdf).toHaveBeenCalledWith({ orientation: 'p', unit: 'mm' });
  });
});
