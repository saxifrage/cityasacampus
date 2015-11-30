#!/bin/bash

if !(which bundle >/dev/null); then
  echo "Installing Bundler"
  sudo gem install bundler --no-rdoc --no-ri
fi