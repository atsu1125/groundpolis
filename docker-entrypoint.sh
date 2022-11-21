#!/bin/bash

set -e

echo "-- Waiting for database..."
while ! pg_isready -U ${DB_USER:-example-misskey-user} -d postgres://${DB_HOST:-db}:5432/${DB_NAME:-groundpolis} -t 1; do
    sleep 1s
done

echo "-- Running migrations..."
yarn run migrate

echo "-- Starting!"
yarn start
