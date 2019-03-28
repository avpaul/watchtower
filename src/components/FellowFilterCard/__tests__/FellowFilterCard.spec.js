import React from 'react';
import { shallow } from 'enzyme';
import FellowFilterCard from '../FellowFilterCard';

describe('Fellow filter card tests', () => {
  const setup = (cardName, numberOfFellows, isTicked, filterKey) => {
    const props = {
      cardName,
      numberOfFellows,
      isTicked,
      handleCardClick: jest.fn(),
      filterKey
    };
    const fellowFilterCardWrapper = shallow(<FellowFilterCard {...props} />);
    return { fellowFilterCardWrapper, props };
  };

  let { fellowFilterCardWrapper } = setup(
    'Watch Tower',
    3,
    { status: 'All Fellows', project: 'All Products' },
    'status'
  );

  it('should render fellow filter card without crashing', () => {
    expect(fellowFilterCardWrapper).toMatchSnapshot();
  });

  it('should display 3 on fellow filter card when number of fellows is 3', () => {
    expect(
      fellowFilterCardWrapper.find('.card-number-display').props().children
    ).toBe(3);
  });

  it('should display WatchTower on fellow filter card when the WatchTower is passed in', () => {
    expect(
      fellowFilterCardWrapper
        .find('.card-name')
        .find('span')
        .text()
    ).toBe('Watch Tower');
  });

  it('should not render checkmark on card if status or project props is not equal to cards name', () => {
    expect(
      fellowFilterCardWrapper.find('.checkmark').props().style.display
    ).toBe('none');
  });

  it('should render a checkmark svg on filter card', () => {
    expect(fellowFilterCardWrapper.find('.checkmark').props().src).toBe(
      'check-mark.svg'
    );
  });

  it('should display checkmark if status or project props is equal the card name', () => {
    [{ fellowFilterCardWrapper }] = [
      setup(
        'Watch Tower',
        3,
        { status: 'All Fellows', project: 'Watch Tower' },
        'status'
      )
    ];
    expect(
      fellowFilterCardWrapper.find('.checkmark').props().style.display
    ).toBe('block');
  });

  it('should call handleCardClick when card is clicked', () => {
    fellowFilterCardWrapper.find('.fellow-summary-card').simulate('click');
    expect(fellowFilterCardWrapper.props().onClick).toHaveBeenCalled();
  });

  it('should call handleClick when card is keypress event occurs', () => {
    fellowFilterCardWrapper.find('.fellow-summary-card').simulate('keypress');
    expect(fellowFilterCardWrapper.props().onKeyPress).toHaveBeenCalled();
  });
});
