#!/bin/sh

# Check if TEST_REDIS_PORT is set and not empty
if [ -z "$TEST_REDIS_PORT" ]; then
  echo "TEST_REDIS_PORT is not set. Exiting tests-redis service."
  exit 0  # Exit gracefully to avoid error status
else
  echo "Starting tests-redis with TEST_REDIS_PORT=$TEST_REDIS_PORT"
  exec redis-server --port 6379  # Start Redis with default port
fi