import React from "react";
import renderer from "react-test-renderer";
import AdBanner from "../src/components/ad-banner/ad-banner";

test("renders AdBanner component correctly", () => {
const component = renderer.create(<AdBanner />);
const tree = component.toJSON();
expect(tree).toMatchSnapshot();
});