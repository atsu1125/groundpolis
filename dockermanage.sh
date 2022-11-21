#!/bin/sh

docker-compose -f docker-compose-split.yml run --rm web $@
