import React from 'react';
import LargeHeader from './LargeHeader';
import { shallow, mount } from 'enzyme';

it("renders without crashing", () => {
  shallow(<LargeHeader />);
});

const titles =  "Tasks";

describe("", () => {
  it("accepts large header title props", () => {
    const wrapper = mount(<LargeHeader title={titles} />);
    expect(wrapper.props().title).toEqual("Tasks");
  });
  it("contains large header title", () => {
    const wrapper = mount(<LargeHeader title={titles} />);
    const value = wrapper.find("h1").text();
    expect(value).toEqual("Tasks");
  });
})