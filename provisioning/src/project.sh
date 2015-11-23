#!/bin/bash

if [ ! -d "~/cityasacampus/client/node_modules" ]; then
  cd ~/cityasacampus/client
  sudo npm uninstall --save-dev gulp-sass
  sudo npm install --save-dev gulp-sass@2
  sudo npm install
  sudo gulp production

  printf "Enter rails app secret: "; read secret
  printf "Enter rails app token: "; read token

  sudo bash -c "echo \"export APP_SECRET=$secret\" >> /etc/profile"
  sudo bash -c "echo \"export APP_TOKEN=$token\" >> /etc/profile"
  source /etc/profile

  bundle install
  rake assets:precompile
  
  rake db:setup
  rake db:migrate
  rake db:seed
fi
