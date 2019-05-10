import React from 'react';
import { shallow } from 'enzyme';

import PipFeedbackModal from '../PipFeedbackModal';

const feedback = {
  id: 1,
  details_type: 'rating',
  details_id: 1,
  fellow_id: '-LHs4sEcIAVnPeKHTBGd',
  started_at: '2019-04-25 00:00:00',
  expected_to_end_at: '2019-05-09 00:00:00',
  support: '[]',
  week_number: 14,
  staff_id: '-LGy4OuPDHCZCZvDuPz0',
  status: 'ongoing',
  created_at: '2019-04-25 12:00:21',
  updated_at: '2019-04-25 12:00:21',
  pip_for_dev_pulse: {
    id: 1,
    attributes: [
      {
        attribute: 'quality',
        score: 0,
        description:
          'Improve your code quality to match the team and global standards',
        activity: 'Quality',
        details: 'Remove commented code'
      },
      {
        attribute: 'integration',
        score: 0,
        description: 'Improve your relationship to other teammates',
        activity: 'Quality',
        details: 'Be more active in team activities'
      }
    ],
    created_at: '2019-04-25 12:00:21',
    updated_at: '2019-04-25 12:00:21'
  },
  pip_for_lms: null
};

it('renders modal component given the props', () => {
  const closeFn = jest.fn();

  const container = shallow(
    <PipFeedbackModal closeFn={closeFn} feedback={feedback} />
  );

  const overlay = container.find('.modal-body');
  expect(typeof overlay).toEqual('object');

  const modalTitle = overlay.find('.modal-body-title');
  expect(typeof modalTitle).toBe('object');
  const modalContent = overlay.find('.modal-body-content');
  expect(modalContent.length >= 0).toBeTruthy();
});

it('renders modal with feedback of type pre-pip', () => {
  feedback.type = 'pre-pip';

  const closeFn = jest.fn();

  const container = shallow(
    <PipFeedbackModal closeFn={closeFn} feedback={feedback} />
  );

  const overlay = container.find('.modal-body');
  expect(typeof overlay).toEqual('object');

  const modalTitle = overlay.find('.modal-body-title');
  expect(typeof modalTitle).toBe('object');
  const modalContent = overlay.find('.modal-body-content');
  expect(modalContent.length >= 0).toBeTruthy();
});

it('renders modal with feedback of type pre-pip', () => {
  feedback.type = 'pre-pip';
  feedback.pip_for_dev_pulse = null;
  feedback.pip_for_lms = {
    attributes: ['quantity', 'communication']
  };

  const closeFn = jest.fn();

  const container = shallow(
    <PipFeedbackModal closeFn={closeFn} feedback={feedback} />
  );

  const overlay = container.find('.modal-body');
  expect(typeof overlay).toEqual('object');

  const modalTitle = overlay.find('.modal-body-title');
  expect(typeof modalTitle).toBe('object');
  const modalContent = overlay.find('.modal-body-content');
  expect(modalContent.length >= 0).toBeTruthy();
});
