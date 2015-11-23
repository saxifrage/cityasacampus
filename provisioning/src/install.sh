#!/bin/bash

sudo apt-get update -y &&
sudo apt-get install -y git-core &&
git clone https://github.com/saxifrage/cityasacampus.git /home/ubuntu/cityasacampus &&
cd /home/ubuntu/cityasacampus/provisioning &&
sed -i -- 's/{{home_user}}/ubuntu/g' ./src/* && #{{home_user}} is replaced in files with 'ubuntu'
./src/system.sh &&
./src/node_npm_gulp.sh &&
./src/ruby_gem_rake.sh &&
./src/rails.sh &&
./src/bundler.sh &&
./src/postgres.sh
./src/project.sh
./src/nginx.sh &&
./src/puma.sh
