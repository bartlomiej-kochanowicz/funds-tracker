import request from 'supertest';

export const getGqlErrorStatus = (response: request.Response): number =>
  response.body.errors[0].extensions.response.statusCode;
