import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Thunk from 'redux-thunk';
import initialState from '../../../redux/reducers/initialState';
import Card from '../Card';
import Modal from '../../LargeModal/LargeModal';
import ViewCertificationApplicantsModal from '../../../views/CadreDashboard/CertificatesDashboard/ViewCertificationApplicants/ViewCertificationApplicantsModal';

let wrapper;

describe('Test Role Card component', () => {
  const defaultProps = {
    cardProps: {
      details: {
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
      fetcher: jest.fn(),
      loading: false,
      activeParticipants: {},
      type: 'role'
    },
    focusRole: jest.fn()
  };

  it('should render correctly', () => {
    wrapper = shallow(<Card {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal', () => {
    wrapper = shallow(<Card {...{ ...defaultProps, loading: true }} />);
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
      .find('.modal-close')
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('should call focus role when dropdown option is clicked', () => {
    const spy = jest.fn();
    const cardWrapper = shallow(
      <Card {...{ ...defaultProps, focusRole: spy }} />
    );
    cardWrapper.find('.role-card__icon').simulate('click');

    cardWrapper
      .find('.dropdown-item')
      .at(0)
      .simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should render role applicants modal', () => {
    const mockStore = configureStore([Thunk]);
    const store = mockStore(initialState);
    const wrapperNew = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Card {...{ ...defaultProps }} />
        </MemoryRouter>
      </Provider>
    );
    wrapperNew.find('#applicants_count').simulate('click');
    expect(wrapperNew.find('#roleApplicantsModal')).toBeTruthy();
  });
});

describe('Test Certification Card component', () => {
  const props = {
    cardProps: {
      details: {
        id: 1,
        name: 'test role',
        description:
          'test role description should render role card instance properly should render role card instance properly',
        active_engineers_count: 1,
        applications_count: 2,
        certified_engineers: 2,
        created_at: '2019-06-04 04:56:39',
        updated_at: '2019-06-04 04:56:39'
      },
      fetcher: jest.fn(),
      type: 'certificates',
      activeParticipants: {}
    },
    focusRole: jest.fn(),
    setCertificationOnFocus: jest.fn()
  };

  it('should render correctly', () => {
    wrapper = shallow(<Card {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal', () => {
    wrapper = shallow(<Card {...{ ...props, loading: true }} />);
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
      .find('.modal-close')
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle click of edit certification button', () => {
    wrapper
      .find('.dropdown-item')
      .at(0)
      .simulate('click');
  });

  it('should handle click of delete certification button', () => {
    wrapper
      .find('.dropdown-item')
      .at(1)
      .simulate('click');
  });

  it('should show the certification Applicants Modal when user clicks on the button', () => {
    wrapper.find('#applicants_count').simulate('click');
    const modalProps = {
      open: jest.fn(),
      toggle: jest.fn(),
      certificationId: 1,
      title: 'hello certification here'
    };
    const applicantsModal = wrapper.find(
      <ViewCertificationApplicantsModal {...modalProps} />
    );
    expect(applicantsModal).toMatchSnapshot();
  });
});
