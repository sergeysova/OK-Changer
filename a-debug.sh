#!/bin/bash

# for make debug application

echo ''
echo '[=- Make extension for debug -=]'

# remove old
rm -rf ./a/*
mkdir -p a

# copy sources
cp -r ./source/* ./a/

# copy manifest
cp -f "./build/chrome-manifest.json" "./a/manifest.json"
echo 'Sources copy successful!'
echo '[=- OK Changer - debug -=]'
