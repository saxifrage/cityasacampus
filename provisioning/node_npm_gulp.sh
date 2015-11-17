#!/bin/bash

if !(which node >/dev/null); then
  curl -sL https://deb.nodesource.com/setup | sudo bash -
  sudo apt-get install -y nodejs
  sudo npm install -g gulp
fi