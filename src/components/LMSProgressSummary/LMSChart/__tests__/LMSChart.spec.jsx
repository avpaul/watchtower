/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import LMSChart, { chartOverview, formatOutputs } from '..';
import LMSChartOverview from '../LMSChartOverview';
import Timeline from '../Timeline';

describe('LMSChart component', () => {
  const props = {
    lmsSummary: {
      data: [
        {
          number_of_outputs_submitted: 1,
          number_of_outputs_satisfied: 1
        }
      ]
    },
    lmsSubmissions: {
      outputs: [
        {
          id: 1122,
          due_date: new Date(),
          name: 'Output 1.1 Kick off call',
          score: '',
          workflow_state: 'submitted'
        },
        {
          id: 1322,
          due_date: new Date(),
          name: 'Output 1.2 Estimating risks',
          score: '2',
          workflow_state: 'graded'
        }
      ]
    }
  };
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<LMSChart {...props} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LMSChart {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders LMS chart', () => {
    const chartWidth = 1480;
    const today = new Date();
    const allSubmissionsFormatted = formatOutputs(
      props.lmsSubmissions ? Object.values(props.lmsSubmissions.outputs) : ''
    );
    const outputsDue = allSubmissionsFormatted
      ? allSubmissionsFormatted.filter(output => output.due_date < today)
      : '';

    expect(
      wrapper.find(
        <LMSChartOverview
          {...chartOverview(props.lmsSummary, allSubmissionsFormatted)}
        />
      )
    ).toBeDefined();
    expect(
      wrapper.find(
        <Timeline
          allOutputs={allSubmissionsFormatted}
          outputsDue={outputsDue}
          width={chartWidth}
        />
      )
    ).toBeDefined();
  });
});
