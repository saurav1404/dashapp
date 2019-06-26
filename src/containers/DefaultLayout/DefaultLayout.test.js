import React from 'react';
import { DefaultLayout } from './DefaultLayout';
import { shallowToJson } from 'enzyme-to-json';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('DefaultLayout test cases', () => {
  let output;
  beforeEach(() => {
    window.localStorage = {
      getItem: jest.fn()
    }
    output = shallow(
      <DefaultLayout />
    );
  });

  afterEach(() => {
    output = null;
  });

  it('should render correctly', () => {
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});