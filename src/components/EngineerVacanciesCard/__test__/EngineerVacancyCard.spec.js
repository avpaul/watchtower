import React from 'react';
import { shallow } from 'enzyme';
import EngineerVacancyCard from '../EngineerVacancyCard';
import NoVacanciesComponent from '../NoVacanciesComponent';

describe('Test EngineerVacancyCard snapshots', () => {
  it('Engineers should be see s nice message when there are no vacancies', () => {
    const EngineerVacancyCardWrapper = shallow(<EngineerVacancyCard />);
    expect(EngineerVacancyCardWrapper).toMatchSnapshot();
  });
  it('Shouls display the NoVacancies card component apporpriately', () => {
    const noVacanciesComponentWrapper = shallow(<NoVacanciesComponent />);
    expect(noVacanciesComponentWrapper).toMatchSnapshot();
  });
});
