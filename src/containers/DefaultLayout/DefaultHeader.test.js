import React from 'react';
import DefaultHeader from './DefaultHeader';
import { shallowToJson } from 'enzyme-to-json';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('DefaultHeader test cases', () => {
  let output;
  beforeEach(() => {
    output = shallow(
      <DefaultHeader />
    );
  });

  afterEach(() => {
    output = null;
  });

  it('should render correctly', () => {
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});