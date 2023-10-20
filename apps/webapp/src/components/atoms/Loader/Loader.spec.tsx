import { Loader } from "components/atoms/Loader";
import { DefaultTheme } from "styled-components";
import { render } from "utils/test-utils";

describe("Atoms/Loader tests", () => {
	it.each([
		["small" as keyof DefaultTheme["loader"]["size"], "1rem"],
		["medium" as keyof DefaultTheme["loader"]["size"], "1.5rem"],
		["large" as keyof DefaultTheme["loader"]["size"], "2rem"],
	])("has correct size for %s", (size, expected) => {
		const { getByTestId } = render(
			<Loader
				$size={size}
				data-testid="test-loader"
			/>,
		);

		expect(getByTestId("test-loader")).toHaveStyleRule("width", expected);
		expect(getByTestId("test-loader")).toHaveStyleRule("height", expected);
	});

	it.each([
		["white" as keyof DefaultTheme["colors"], "3px solid #ffffff"],
		["black" as keyof DefaultTheme["colors"], "3px solid #333333"],
		["blue" as keyof DefaultTheme["colors"], "3px solid #3F8CFF"],
	])("has correct color for %s", (color, expected) => {
		const { getByTestId } = render(
			<Loader
				$color={color}
				data-testid="test-loader"
			/>,
		);

		expect(getByTestId("test-loader")).toHaveStyleRule("border", expected);
	});
});
