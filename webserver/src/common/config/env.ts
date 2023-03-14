export const { WEBSERVER_PORT } = process.env;
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';
export const { REDIS_URL } = process.env;
export const { REDIS_PORT } = process.env;
