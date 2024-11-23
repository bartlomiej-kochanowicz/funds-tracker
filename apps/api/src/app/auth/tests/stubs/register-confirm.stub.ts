import { RegisterConfirmInput, RegisterInput } from "@app/auth/inputs";

export const registerUserStub: RegisterInput = {
	email: "confirm_register@test.com",
	password: "testPassword",
	name: "testName",
	token: "mockToken",
};

export const confirmUserStub: RegisterConfirmInput = {
	email: "confirm_register@test.com",
	code: "123456",
	token: "mockToken",
};
