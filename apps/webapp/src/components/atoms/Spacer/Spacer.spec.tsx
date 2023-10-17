import { Space, Spacer } from "components/atoms/Spacer";
import { render } from "utils/test-utils";

describe("Atoms/Spacer tests", () => {
	it("renders properly", () => {
		const { getByTestId } = render(<Spacer data-testid="spacer" />);

		expect(getByTestId("spacer")).toBeInTheDocument();
	});

	it.each([
		["0.1" as Space, "0.1rem 0"],
		["0.25" as Space, "0.25rem 0"],
		["0.5" as Space, "0.5rem 0"],
		["1" as Space, "1rem 0"],
		["3.5" as Space, "3.5rem 0"],
	])("has correct size for %s", (space, padding) => {
		const { getByTestId } = render(<Spacer data-testid="spacer" $space={space} />);

		expect(getByTestId("spacer")).toHaveStyleRule("padding", padding);
	});
});
