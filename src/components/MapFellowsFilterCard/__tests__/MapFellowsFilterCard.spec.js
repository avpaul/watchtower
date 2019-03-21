import React from 'react';
import { shallow } from 'enzyme';
import MapFellowsFilterCard from '../MapFellowsFilterCard';
import FellowFilterCard from '../../FellowFilterCard';
import fellowSummaryDetails from '../../../__mocks__/fellowSummary.json';

describe('MapFellowsFilterCard tests', () => {
  const setup = (fellowDetails, display, isTicked) => {
    const props = {
      fellowSummaryDetails: fellowDetails,
      display,
      handleCardClick: jest.fn(),
      isTicked
    };
    const mapFellowsFilterCardWrapper = shallow(
      <MapFellowsFilterCard {...props} />
    );
    return { mapFellowsFilterCardWrapper, props };
  };

  it('should render MapFellowsFilterCards without crashing', () => {
    const { mapFellowsFilterCardWrapper } = setup(
      fellowSummaryDetails,
      'status',
      { project: 'All Products', status: 'All Fellows' }
    );
    expect(mapFellowsFilterCardWrapper).toMatchSnapshot();
  });
  it('should render MapFellowsFilterCards when props display is passed in as project', () => {
    const { mapFellowsFilterCardWrapper } = setup(
      fellowSummaryDetails,
      'project',
      { project: 'All Products', status: 'All Fellows' }
    );
    expect(mapFellowsFilterCardWrapper).toMatchSnapshot();
  });
  it('should render 3 fellow filter cards when only one product is available ', () => {
    const { mapFellowsFilterCardWrapper } = setup(
      fellowSummaryDetails,
      'project',
      { project: 'All Products', status: 'All Fellows' }
    );
    expect(mapFellowsFilterCardWrapper.find(FellowFilterCard).length).toBe(3);
  });
  it('should always render 4 fellow filter cards when displaying fellows status', () => {
    const { mapFellowsFilterCardWrapper } = setup(
      fellowSummaryDetails,
      'status',
      { project: 'All Products', status: 'All Fellows' }
    );
    expect(mapFellowsFilterCardWrapper.find(FellowFilterCard).length).toBe(4);
  });
  it('should render total number of fellows under all products to be 6', () => {
    const { mapFellowsFilterCardWrapper } = setup(
      fellowSummaryDetails,
      'status',
      { project: 'All Products', status: 'All Fellows' }
    );
    expect(
      mapFellowsFilterCardWrapper
        .find(FellowFilterCard)
        .first()
        .props().cardName
    ).toBe('All Fellows');
    expect(
      mapFellowsFilterCardWrapper
        .find(FellowFilterCard)
        .first()
        .props().numberOfFellows
    ).toBe(6);
  });
  it('should render total number of fellows on track to be 2', () => {
    const { mapFellowsFilterCardWrapper } = setup(
      fellowSummaryDetails,
      'status',
      { project: 'All Products', status: 'All Fellows' }
    );
    expect(
      mapFellowsFilterCardWrapper
        .find(FellowFilterCard)
        .at(1)
        .props().cardName
    ).toBe('On Track');
    expect(
      mapFellowsFilterCardWrapper
        .find(FellowFilterCard)
        .at(1)
        .props().numberOfFellows
    ).toBe(2);
  });
  it('should render total number of fellows off track to be 1', () => {
    const { mapFellowsFilterCardWrapper } = setup(
      fellowSummaryDetails,
      'status',
      { project: 'All Products', status: 'All Fellows' }
    );
    expect(
      mapFellowsFilterCardWrapper
        .find(FellowFilterCard)
        .at(2)
        .props().cardName
    ).toBe('Off Track');
    expect(
      mapFellowsFilterCardWrapper
        .find(FellowFilterCard)
        .at(2)
        .props().numberOfFellows
    ).toBe(1);
  });
  it('should render total number of fellows on pip to be 3', () => {
    const { mapFellowsFilterCardWrapper } = setup(
      fellowSummaryDetails,
      'status',
      { project: 'All Products', status: 'All Fellows' }
    );
    expect(
      mapFellowsFilterCardWrapper
        .find(FellowFilterCard)
        .at(3)
        .props().cardName
    ).toBe('PIP');
    expect(
      mapFellowsFilterCardWrapper
        .find(FellowFilterCard)
        .at(3)
        .props().numberOfFellows
    ).toBe(3);
  });
});
