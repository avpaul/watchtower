import React from 'react';
import ReactDOM from 'react-dom';
import ManagerFellowSortInput from '.';

describe('<ManagerFellowSortInput />', () => {
  const onChange = jest.fn();

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ManagerFellowSortInput onChange={onChange} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
