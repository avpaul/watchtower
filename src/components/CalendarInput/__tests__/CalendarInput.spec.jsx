import React from 'react';
import { shallow } from 'enzyme';
import CalendarInput from '../CalendarInput';

describe('Test CalendarInput snapshots', () => {
  it('CalendarInput should render properly', () => {
    expect(shallow(<CalendarInput />)).toMatchSnapshot();
  });
});
