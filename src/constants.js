'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  error: 1,
  success: 0,
};
const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const MAX_ID_LENGTH = 6;
const MAX_COMMENTS = 4;

const API_PREFIX = `/api`;
const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  API_PREFIX,
  Env,
};

module.exports.HttpMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};
