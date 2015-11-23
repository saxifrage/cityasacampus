#!/bin/bash

if [ ! -d "/home/{{home_user}}/cityasacampus/shared" ]; then
  mkdir /home/{{home_user}}/cityasacampus/shared
  mkdir /home/{{home_user}}/cityasacampus/shared/pids
  mkdir /home/{{home_user}}/cityasacampus/shared/sockets
  mkdir /home/{{home_user}}/cityasacampus/shared/logs
  mkdir /home/{{home_user}}/cityasacampus/shared/log

  cp /home/{{home_user}}/cityasacampus/provisioning/src/puma_config /home/{{home_user}}/cityasacampus/config/
  mv /home/{{home_user}}/cityasacampus/config/puma_config /home/{{home_user}}/cityasacampus/config/puma.rb
  cd /home/{{home_user}}/cityasacampus

  sudo bundle clean --force
  sudo pumactl -P shared/pids/puma.pid start
fi
