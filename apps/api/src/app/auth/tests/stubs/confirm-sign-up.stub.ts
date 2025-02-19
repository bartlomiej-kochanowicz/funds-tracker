import { ConfirmSignUpInput, SignUpInput } from "@src/app/auth/dto";

export const signUpUserStub: SignUpInput = {
	email: "confirmsignUp@test.com",
	password: "testPassword",
	name: "testName",
	token: "mockToken",
};

export const confirmUserStub: ConfirmSignUpInput = {
	email: "confirmsignUp@test.com",
	code: "123456",
	token: "mockToken",
};
