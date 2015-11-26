#!/bin/bash

if !(which rails >/dev/null); then
  echo "Installing Rails and setting environment to 'development'"
  sudo gem install rails -v 4.2.4 --no-rdoc --no-ri
  
  sudo bash -c "echo \"export RAILS_ENV=development\" >> /etc/profile"
  source /etc/profile
fi
