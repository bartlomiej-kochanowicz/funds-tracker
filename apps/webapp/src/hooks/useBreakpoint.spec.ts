import { renderHook } from "@testing-library/react-hooks";
import { breakpoints } from "constants/breakpoints";
import { useBreakpoint } from "hooks/useBreakpoint";
import { act } from "react-dom/test-utils";

const HEIGHT = 100;

describe("useBreakpoint tests", () => {
	it('change flag when window hit brakepoint "desktop" for min', () => {
		window.resizeTo(breakpoints.desktop + 1, HEIGHT);

		const { result } = renderHook(() => useBreakpoint("desktop", "min"));

		expect(result.current).toBeTruthy();

		act(() => {
			window.resizeTo(breakpoints.desktop - 1, HEIGHT);
		});

		expect(result.current).toBeFalsy();
	});

	it('change flag when window hit brakepoint "desktop" for max', () => {
		window.resizeTo(breakpoints.desktop + 1, HEIGHT);

		const { result } = renderHook(() => useBreakpoint("desktop", "max"));

		expect(result.current).toBeFalsy();

		act(() => {
			window.resizeTo(breakpoints.desktop - 1, HEIGHT);
		});

		expect(result.current).toBeTruthy();
	});
});
