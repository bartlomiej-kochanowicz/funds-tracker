import { Response } from "supertest";

export const getGqlErrorStatus = (response: Response): number =>
	response.body.errors[0].extensions.originalError.statusCode;
