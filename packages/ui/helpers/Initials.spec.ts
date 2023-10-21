import { Initials } from "./Initials";

describe("Initial tests", () => {
	it("should return the initials of a name", () => {
		const initials = new Initials("John Doe");

		expect(initials.getInitials()).toEqual("JD");
	});

	it("should return the initials of a first name", () => {
		const initials = new Initials("John");

		expect(initials.getInitials()).toEqual("JO");
	});

	it("should return the initials of a random char", () => {
		const initials = new Initials("A B C");

		expect(initials.getInitials()).toEqual("AB");
	});

	it("should return the initials of a single char", () => {
		const initials = new Initials("a");

		expect(initials.getInitials()).toEqual("A");
	});
});
