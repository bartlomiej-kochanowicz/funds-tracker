import { describe, expect, it } from "vitest";

import { validateNonNullish } from "./nonNullish";

describe("validateNonNullish", () => {
	it("should return true for non-nullish values", () => {
		expect(validateNonNullish(5)).toBe(true);
		expect(validateNonNullish("hello")).toBe(true);
		expect(validateNonNullish(true)).toBe(true);
		expect(validateNonNullish([])).toBe(true);
		expect(validateNonNullish([1, 2, 3])).toBe(true);
		expect(validateNonNullish([0, 2, 0])).toBe(true);
		expect(validateNonNullish({})).toBe(true);
		expect(validateNonNullish({ name: "John" })).toBe(true);
		expect(validateNonNullish(0)).toBe(true);
	});

	it("should return false for nullish values", () => {
		expect(validateNonNullish(null)).toBe(false);
		expect(validateNonNullish(undefined)).toBe(false);
	});

	it("should recursively validate non-nullish values in arrays", () => {
		expect(validateNonNullish([1, null, 3])).toBe(false);
		expect(validateNonNullish([1, undefined, 3])).toBe(false);
		expect(validateNonNullish([1, [null, 2], 3])).toBe(false);
		expect(validateNonNullish([1, [undefined, 2], 3])).toBe(false);
		expect(validateNonNullish([1, [2, [null, 4]], 3])).toBe(false);
		expect(validateNonNullish([1, [2, [undefined, 4]], 3])).toBe(false);
		expect(validateNonNullish([1, [2, [3, [null, 5]]], 3])).toBe(false);
		expect(validateNonNullish([1, [2, [3, [undefined, 5]]], 3])).toBe(false);
	});
});
