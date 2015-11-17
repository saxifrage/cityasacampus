#!/bin/bash

if [ ! -d "/home/ubuntu/cityasacampus/shared" ]; then
  mkdir /home/ubuntu/cityasacampus/shared
  mkdir /home/ubuntu/cityasacampus/shared/pids
  mkdir /home/ubuntu/cityasacampus/shared/sockets
  mkdir /home/ubuntu/cityasacampus/shared/logs
  mkdir /home/ubuntu/cityasacampus/shared/log

  cp /home/ubuntu/cityasacampus/provisioning/src/puma_config /home/ubuntu/cityasacampus/config/
  mv /home/ubuntu/cityasacampus/config/puma_config /home/ubuntu/cityasacampus/config/puma.rb
  cd /home/ubuntu/cityasacampus

  sudo bundle clean --force
  sudo pumactl -P shared/pids/puma.pid start
fi
