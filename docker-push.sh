#!/bin/bash

function login {
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
}

TAG=$(git log -1 --pretty=%h)

docker build -t district0x/district0x-landing-page:$TAG -f docker-builds/Dockerfile .
docker tag district0x/district0x-landing-page:$TAG district0x/district0x-landing-page:latest

login
docker push district0x/district0x-landing-page
