import React from 'react';
import enzyme from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import AnalyticsComponent from '..';

describe('Authorization', () => {
  // react-ga crashes tests if the test mode is not set right
  // since it tries appending nodes to the dom

  test('It renders the test analytics component without crashing', () => {
    expect(() => {
      enzyme.mount(
        <MemoryRouter>
          <Route component={AnalyticsComponent} />
        </MemoryRouter>
      );
    }).not.toThrow();
  });
});
