import React from 'react';
import { mount } from 'enzyme';
import ViewRoleApplicantsModal from '../viewRoleApplicantsModal';

const props = {
  loading: false,
  data: {
    applications: [
      {
        applicant: {
          id: 56,
          role: 'admin',
          sims_project_technology: 'Node/React',
          apprenticeship_technology: 'Node/Agular'
        }
      }
    ]
  },
  getARole: jest.fn(),
  roleId: 1,
  toggle: jest.fn(),
  open: true,
  title: 'Title'
};
const wrapper = mount(<ViewRoleApplicantsModal {...props} />);
describe('Role Applicants Modal', () => {
  it('should  match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should show loading', () => {
    wrapper.setProps({ loading: true });
    wrapper.instance().forceUpdate();
    const loading = wrapper.find(`[testId="loading-indicator"]`);
    expect(loading).toBeTruthy();
  });
});
