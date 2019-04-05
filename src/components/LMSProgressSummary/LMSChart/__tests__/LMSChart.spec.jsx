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
      submitted: 1,
      satisfied: 1
    },
    lmsSubmissions: [
      {
        id: 1122,
        due_date: new Date(),
        score: '',
        status: 'submitted',
        assignment: {
          name: 'Output 1.1 Kick off call'
        }
      },
      {
        id: 1322,
        due_date: new Date(),
        score: '2',
        status: 'graded',
        assignment: {
          name: 'Output 1.2 Estimating risks'
        }
      }
    ]
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
      Object.values(props.lmsSubmissions)
    );
    const outputsDue = allSubmissionsFormatted.filter(
      output => output.due_date < today
    );

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
