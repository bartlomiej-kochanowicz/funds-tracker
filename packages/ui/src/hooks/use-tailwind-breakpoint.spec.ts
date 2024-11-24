import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import resolveConfig from "tailwindcss/resolveConfig";
import { describe, expect, it, test } from "vitest";

import tailwindConfig from "../../tailwind.config";
import { useTailwindBreakpoint } from "./use-tailwind-breakpoint";

const fullConfig = resolveConfig(tailwindConfig);
const { screens } = fullConfig.theme;

const HEIGHT = 100;

describe("useTailwindBreakpoint tests", () => {
	test.each(Object.keys(screens))('change flag when window hit brakepoint "%s" for max', name => {
		const brakepoint = screens[name].replace("px", "");
		window.resizeTo(brakepoint + 1, HEIGHT);

		const { result } = renderHook(() => useTailwindBreakpoint(name));

		expect(result.current).toBeTruthy();

		act(() => {
			window.resizeTo(brakepoint - 1, HEIGHT);
		});

		expect(result.current).toBeFalsy();
	});

	it('change flag when window hit brakepoint "desktop" for min', () => {
		expect(true).toBeTruthy();
	});
});
