import React from 'react';
import ReactDOM from 'react-dom';
import ManagerFellowSortInput from '..';

describe('<ManagerFellowSortInput />', () => {
  const onChange = jest.fn();
  const sortLabel = 'Fellow Ratio, High to Low';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ManagerFellowSortInput onChange={onChange} sortLabel={sortLabel} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
