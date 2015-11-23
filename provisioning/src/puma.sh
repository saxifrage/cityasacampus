#!/bin/bash

if [ ! -d "~/cityasacampus/shared" ]; then
  mkdir ~/cityasacampus/shared
  mkdir ~/cityasacampus/shared/pids
  mkdir ~/cityasacampus/shared/sockets
  mkdir ~/cityasacampus/shared/logs
  mkdir ~/cityasacampus/shared/log

  cp ~/cityasacampus/provisioning/src/puma_config ~/cityasacampus/config/
  sed -i -- "s|{{base}}|$(echo ~)|g" ~/cityasacampus/config/puma_config
  mv ~/cityasacampus/config/puma_config ~/cityasacampus/config/puma.rb
  cd ~/cityasacampus

  sudo bundle clean --force
  sudo pumactl -P shared/pids/puma.pid start
fi
