#!/usr/bin/env bash

echo "=== Testing mise environment in monorepo ==="
echo

echo "1. Testing root environment:"
echo "NODE_ENV: $NODE_ENV"
echo "BASE_URL: $BASE_URL"
echo "SHARED_SECRET: $SHARED_SECRET"

echo
echo "2. Testing web app environment:"
cd apps/web
mise exec -- bash -c 'echo "NODE_ENV: $NODE_ENV"; echo "BASE_URL: $BASE_URL"; echo "PORT: $PORT"; echo "APP_NAME: $APP_NAME"; echo "WEB_SECRET: $WEB_SECRET"; echo "SHARED_SECRET: $SHARED_SECRET"'

echo
echo "3. Testing api environment:"
cd ../api
mise exec -- bash -c 'echo "NODE_ENV: $NODE_ENV"; echo "BASE_URL: $BASE_URL"; echo "PORT: $PORT"; echo "APP_NAME: $APP_NAME"; echo "API_KEY: $API_KEY"; echo "SHARED_SECRET: $SHARED_SECRET"'

cd ../..
echo
echo "=== Test complete ==="