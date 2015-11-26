#!/bin/bash

if !(which node >/dev/null); then
  echo "Installing Node, NPM, and Gulp"
  curl -sL https://deb.nodesource.com/setup | sudo bash -
  sudo apt-get install -y nodejs
  sudo npm install -g gulp
fi