#!/bin/bash

sudo apt-get update -y &&
sudo apt-get install -y git-core &&
git clone https://github.com/saxifrage/cityasacampus.git ~/cityasacampus &&
cd ~/cityasacampus/provisioning &&
./src/install.sh
