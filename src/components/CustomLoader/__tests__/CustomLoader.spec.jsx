import React from 'react';
import { shallow } from 'enzyme';
import CadreLoader from '../CadreLoader';
import PMLoader from '../PMLoader';
import LoaderComponent from '../LoaderComponent';
import cadreLoaderGif from '../../../static/engineerLoaderGif.gif';

describe('test custom loader components', () => {
  it('should render the generic loader component properly', () => {
    expect(shallow(<LoaderComponent img={cadreLoaderGif} />)).toMatchSnapshot();
  });
  it('should render the PMLoader properly', () => {
    expect(shallow(<PMLoader />)).toMatchSnapshot();
  });
  it('should render the CadreLoader component properly', () => {
    expect(shallow(<CadreLoader />)).toMatchSnapshot();
  });
});
