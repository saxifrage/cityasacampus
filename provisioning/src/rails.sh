#!/bin/bash

if !(which rails >/dev/null); then
  sudo gem install rails -v 4.2.4 --no-rdoc --no-ri
  
  sudo bash -c "echo \"export RAILS_ENV=production\" >> /etc/profile"
  source /etc/profile
fi