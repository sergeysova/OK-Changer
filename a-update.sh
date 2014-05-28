#!/bin/bash

# for updates source folder


echo ''
echo '[=- Update sources -=]'

# copy sources
cp -r ./a/* source/
rm -f source/manifest.json

# manifest
cp -f "./a/manifest.json" "./build/chrome-manifest.json"

echo '[=- Sources of OK Changer updated -=]'
