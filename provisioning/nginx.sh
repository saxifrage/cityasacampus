#!/bin/bash

if !(which nginx >/dev/null); then
  sudo apt-get install -y nginx
  
  cp /home/ubuntu/cityasacampus/provisioning/src/nginx_config /etc/nginx/sites-available/
  mv /etc/nginx/sites-available/nginx_config /etc/nginx/sites-available/default

  sudo update-rc.d nginx enable
  sudo service nginx restart
fi