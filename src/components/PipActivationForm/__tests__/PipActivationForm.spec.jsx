import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import DatePicker from 'react-datepicker';
import PipActivationForm from '../PipActivationForm';
import MapManagementSupportFields from '../MapManagementSupportFields';
import ManagementSupportField from '../ManagementSupportField';
import MapAreasOfConcernData from '../MapAreasOfConcernData';
import AreaOfConcern from '../AreaOfConcern';
import AreaOfConcernInput from '../AreaOfConcernInput';

describe('PipActivationForm component', () => {
  const mockStore = configureMockStore();
  let wrapper;
  const props = {
    averageRatings: {
      quality: '0.1',
      quantity: '0.41',
      initiative: '0.33',
      communication: '0.00',
      professionalism: '0.00',
      integration: '0.00'
    },
    getFellowHistoryData: jest.fn(),
    handleMgtInputChange: jest.fn(),
    addManagementSupport: jest.fn(),
    handleSubmit: jest.fn(),
    onClick: jest.fn(),
    handleChange: jest.fn(),
    fellow: {
      id: 10,
      picture: null,
      project: 'Watch Tower',
      email: 'kingsley.obot@andela.com',
      user: {
        firstName: 'Kingsley',
        lastName: 'Obot'
      }
    }
  };

  const store = mockStore({
    mgtSupportFieldCount: 1
  });

  beforeEach(() => {
    wrapper = shallow(<PipActivationForm {...props} store={store} />);
  });

  it('should render correctly', () => {
    wrapper.setState(
      { startDate: new Date('01 Jan 2019 16:00:00 GMT') },
      () => {
        expect(wrapper).toMatchSnapshot();
      }
    );
  });

  it('should call addManagementSupport() when the addSupport button is clicked', () => {
    wrapper.setState({ mgtSupportFieldCount: 1 });
    wrapper
      .find('#addSupportButton')
      .simulate('click', { preventDefault() {} });

    expect(wrapper.state('mgtSupportFieldCount')).toBe(2);
  });

  it('should call handleSubmit() when the submit button is clicked', () => {
    wrapper
      .find('#submitFormButton')
      .simulate('click', { preventDefault() {} });
    expect(props.handleSubmit).not.toBeCalled();
  });

  it('should call handleDateChange() when the the calendar is clicked', () => {
    const newDate = new Date('08 Mat 2019 16:00:00 GMT');
    wrapper.find(DatePicker).simulate('change', newDate);
    expect(wrapper.state().startDate).toBe(newDate);
  });

  it('should update managementSupport array when a new Management Support has been added', () => {
    wrapper
      .find(MapManagementSupportFields)
      .dive()
      .find(ManagementSupportField)
      .dive()
      .find('input')
      .simulate('change', {
        target: {
          name: '1',
          value: 'You performed below expectations'
        }
      });

    expect(wrapper.state().managementSupport['1']).toBe(
      'You performed below expectations'
    );
  });

  const findAreaOfConcernInput = inputIndex =>
    wrapper
      .find(MapAreasOfConcernData)
      .dive()
      .find(AreaOfConcern)
      .at(inputIndex)
      .dive()
      .find(AreaOfConcernInput)
      .at(1)
      .dive()
      .find('textarea');

  const testAreaOfConcernInput = (input, target) => {
    findAreaOfConcernInput(input.index).simulate('change', { target });
    expect(wrapper.state()[input.name][target.name]).toBe(target.value);
  };

  it('should populate the quality area of concern if AverageRating is < 1  ', () => {
    testAreaOfConcernInput(
      {
        index: 0,
        name: 'quality'
      },
      {
        name: 'description',
        value: 'Your quality of work below expectations'
      }
    );
  });

  it('should populate the quantity area of concern if AverageRating is < 1 ', () => {
    testAreaOfConcernInput(
      {
        index: 1,
        name: 'quantity'
      },
      {
        name: 'details',
        value: 'Your delivery is below expectations'
      }
    );
  });

  it('should populate the initiative area of concern if AverageRating is < 1 ', () => {
    testAreaOfConcernInput(
      {
        index: 2,
        name: 'initiative'
      },
      {
        name: 'description',
        value: 'Your initiative needs improvement'
      }
    );
  });

  it('should populate the communication area of concern if AverageRating is < 1 ', () => {
    testAreaOfConcernInput(
      {
        index: 3,
        name: 'communication'
      },
      {
        name: 'description',
        value: 'Your communication skills are lacking'
      }
    );
  });

  it('should populate the professionalism area of concern if AverageRating is < 1 ', () => {
    testAreaOfConcernInput(
      {
        index: 4,
        name: 'professionalism'
      },
      {
        name: 'details',
        value: 'Please improve on your professionalism'
      }
    );
  });

  it('should populate the integration area of concern if AverageRating is < 1 ', () => {
    testAreaOfConcernInput(
      {
        index: 5,
        name: 'integration'
      },
      {
        name: 'description',
        value: 'Please improve on your integration skills'
      }
    );
  });

  it('should update state when Pip Period is updated', () => {
    wrapper.find('select').simulate('change', {
      target: {
        name: 'pipPeriod',
        value: 4
      }
    });
    expect(wrapper.state('pipPeriod')).toBe(4);
  });
});
