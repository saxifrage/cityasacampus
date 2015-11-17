#!/bin/bash

if !(which bundle >/dev/null); then
  sudo gem install bundler --no-rdoc --no-ri
fi