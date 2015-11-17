#!/bin/bash

if [ ! -d "/home/ubuntu/cityasacampus/client/node_modules" ]; then
  cd /home/ubuntu/cityasacampus/client
  sudo npm uninstall --save-dev gulp-sass
  sudo npm install --save-dev gulp-sass@2
  sudo npm install
  sudo gulp production
  
  sudo bash -c "echo \"export APP_SECRET=$1\" >> /etc/profile"
  sudo bash -c "echo \"export APP_TOKEN=$2\" >> /etc/profile"
  source /etc/profile

  bundle install
  rake assets:precompile
  
  rake db:setup
  rake db:migrate
  rake db:seed
fi