#!/bin/bash

if [ ! -d "~/cityasacampus/client/node_modules" ]; then
  echo "Installing CaaC frontend dependencies"
  echo "Building CaaC frontend"
  cd ~/cityasacampus/client
  sudo npm uninstall --save-dev gulp-sass
  sudo npm install --save-dev gulp-sass@2
  sudo npm install
  sudo gulp production

  echo "Setting application secrets and tokens"
  secret=`cat /dev/urandom | tr -cd 'a-f0-9' | head -c 32`
  token=`cat /dev/urandom | tr -cd 'a-f0-9' | head -c 32`

  sudo bash -c "echo \"export APP_SECRET=$secret\" >> /etc/profile"
  sudo bash -c "echo \"export APP_TOKEN=$token\" >> /etc/profile"
  source /etc/profile

  echo "Installing CaaC Rails dependencies"
  bundle install
  rake assets:precompile

  echo "Migrating CaaC database to latest version"
  rake db:setup
  rake db:migrate
  rake db:seed

  echo "Starting development server"
  rails server
fi
