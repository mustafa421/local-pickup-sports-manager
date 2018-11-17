import React from "react";
import renderer from "react-test-renderer";
import PreferencesScreen from "../screens/PreferencesScreen";
import { shallow } from 'enzyme';
import Button from './Button';

describe("PreferencesScreen tests", () => {
    
  test("snapshot", () => {
    const tree = renderer.create(<PreferencesScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});