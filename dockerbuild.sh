#!/bin/sh

docker-compose -f docker-compose-split.yml build --build-arg UID=$(id -u) --build-arg GID=$(id -g) web
