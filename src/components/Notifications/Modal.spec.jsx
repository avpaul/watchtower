import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from './Modal';

describe('Modal ', () => {
  it('renders snap', () => {
    const snap = shallow(
      <Modal show>
        <h2> Test children </h2>
      </Modal>
    );
    expect(snap).toMatchSnapshot();
  });
});
