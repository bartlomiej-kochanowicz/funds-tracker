#!/bin/sh

# Check if TEST_POSTGRES_PORT is set and not empty
if [ -z "$TEST_POSTGRES_PORT" ]; then
  echo "TEST_POSTGRES_PORT is not set. Exiting tests-database service."
  exit 0  # Exit gracefully
else
  echo "Starting tests-database with TEST_POSTGRES_PORT=$TEST_POSTGRES_PORT"
  exec docker-entrypoint.sh postgres  # Start PostgreSQL
fi