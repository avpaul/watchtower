import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveContainer } from 'recharts';
import StackedBarChart from '..';

describe('<StackBarChart /> Test Suite', () => {
  it('should render properly', () => {
    const props = {
      title: 'DOB Fellows',
      data: [
        { name: 'Cohort 1', offTrack: 20, onTrack: 20 },
        { name: 'Cohort 2', offTrack: 30, onTrack: 39 },
        { name: 'Cohort 3', offTrack: 20, onTrack: 90 }
      ]
    };
    const wrapper = shallow(
      <StackedBarChart data={props.data} title={props.title} />
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find(ResponsiveContainer).length).toEqual(1);
  });

  it('snapshot the component with data', () => {
    const props = {
      title: 'DOB Fellows',
      data: [
        { name: 'Cohort 1', OffTrack: 20, OnTrack: 20 },
        { name: 'Cohort 2', OffTrack: 30, OnTrack: 39 },
        { name: 'Cohort 3', OffTrack: 20, OnTrack: 90 }
      ]
    };
    const wrapper = shallow(
      <StackedBarChart data={props.data} title={props.title} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
