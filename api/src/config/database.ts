import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from 'config/env';

export const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
