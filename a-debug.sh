#!/bin/bash

# for make debug application

echo ''
echo '[=- Make extension for debug -=]'

# remove old
rm -rf ./a/*
mkdir -p a

# copy sources
cp -r ./source/* ./a/
echo 'Sources copy successful!'

# copy manifest
cp -f "./build/chrome-manifest.json" "./a/manifest.json"
echo 'Manifest!'

echo '[=- OK Changer - debug -=]'
