#!/bin/bash

if !(which nginx >/dev/null); then
  sudo apt-get install -y nginx

  sudo cp ~/cityasacampus/provisioning/src/nginx_config /etc/nginx/sites-available/
  sudo sed -i -- "s|{{base}}|$(echo ~)|g" /etc/nginx/sites-available/nginx_config
  sudo mv /etc/nginx/sites-available/nginx_config /etc/nginx/sites-available/default

  sudo update-rc.d nginx enable
  sudo service nginx restart
fi
