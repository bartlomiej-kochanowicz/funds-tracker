import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { useHover } from "hooks/useHover";
import { render } from "utils/test-utils";

describe("useHover tests", () => {
	it("set isHover on true when mouse over", async () => {
		const {
			result: {
				current: { props, isHover },
			},
		} = renderHook(() => useHover());

		const { getByTestId } = render(
			<div data-testid="div-hover" {...props}>
				test
			</div>,
		);

		const div = await getByTestId("div-hover");

		expect(isHover).toBe(false);

		const user = userEvent.setup();

		await user.hover(div);

		await user.unhover(div);
	});
});
